using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Management.Controllers;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Web.Common.Authorization;
using Umbraco.Cms.Web.Common.Routing;

namespace Test.Extension.Controllers
{
    /// <summary>
    /// Base controller for Test API endpoints.
    /// Provides common configuration and authorization for all Test-related controllers.
    /// </summary>
    [ApiController]
    [BackOfficeRoute("mindburn/api/v{version:apiVersion}")]
    [Authorize(Policy = AuthorizationPolicies.SectionAccessContent)]
    [MapToApi(Constants.ApiName)]
    public class TestApiControllerBase : ManagementApiControllerBase 
    {
    }
}