using Asp.Versioning;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Api.Management.OpenApi;
using Umbraco.Cms.Api.Common.OpenApi;

namespace Test.Extension.Composers
{
    // Necessary code for the new API to show in the Swagger documentation and Swagger UI
    public class TestExtensionBackOfficeSecurityRequirementsOperationFilter : BackOfficeSecurityRequirementsOperationFilterBase
    {
        protected override string ApiName => Constants.ApiName;
    }

    public class TestExtensionConfigureSwaggerGenOptions : IConfigureOptions<SwaggerGenOptions>
    {
        public void Configure(SwaggerGenOptions options)
        {
            options.SwaggerDoc(Constants.ApiName, new OpenApiInfo 
            { 
                Title = "Test Extension API v1", 
                Version = "1.0",
                Description = "API endpoints for the Test Extension package"
            });
            options.OperationFilter<TestExtensionBackOfficeSecurityRequirementsOperationFilter>();
        }
    }

    public class ApiComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            var logger = builder.Services.BuildServiceProvider().GetService<ILogger<ApiComposer>>();
            logger?.LogInformation("Test Extension: ApiComposer initialization starting");

            try
            {
                builder.Services.AddSingleton<IOperationIdHandler, CustomOperationHandler>();
                logger?.LogInformation("Test Extension: CustomOperationHandler registered");

                builder.Services.ConfigureOptions<TestExtensionConfigureSwaggerGenOptions>();
                logger?.LogInformation("Test Extension: Swagger configuration completed");
            }
            catch (Exception ex)
            {
                logger?.LogError(ex, "Test Extension: Error during ApiComposer initialization");
                throw;
            }

            logger?.LogInformation("Test Extension: ApiComposer initialization completed");
        }

        // This is used to generate nice operation IDs in our swagger json file
        public class CustomOperationHandler : OperationIdHandler
        {
            public CustomOperationHandler(IOptions<ApiVersioningOptions> apiVersioningOptions) : base(apiVersioningOptions)
            {
            }

            protected override bool CanHandle(ApiDescription apiDescription, ControllerActionDescriptor controllerActionDescriptor)
            {
                return controllerActionDescriptor.ControllerTypeInfo.Namespace?.StartsWith("Test.Extension.Controllers", comparisonType: StringComparison.InvariantCultureIgnoreCase) is true;
            }

            public override string Handle(ApiDescription apiDescription) => $"{apiDescription.ActionDescriptor.RouteValues["action"]}";
        }
    }
} 