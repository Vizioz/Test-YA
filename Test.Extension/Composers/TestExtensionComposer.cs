using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace Test.Extension.Composers;

public class TestExtensionComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        // Register any services or components here
        // For now, the controller will be automatically discovered
        
        // Example of registering a service:
        // builder.Services.AddScoped<ITestService, TestService>();
    }
} 