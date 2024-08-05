using System.Web.Http;
using System.Web.Http.Cors;

namespace AxonApparels
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Enable CORS globally
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);

            // Configure Web API routes
            config.MapHttpAttributeRoutes();

            // Remove the default API route
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            // Add a custom route for the PurchaseApproval controller
            config.Routes.MapHttpRoute(
                name: "PurchaseApprovalApi",
                routeTemplate: "api/apipurchaseapproval/{purOrdNo}",
                defaults: new { controller = "ApiPurchaseApproval", purOrdNo = RouteParameter.Optional }
            );
        }
    }
}
