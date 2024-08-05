using AxonApparel.Domain;
using AxonApparels.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Script.Serialization;
using System.Web.Security;

namespace AxonApparels
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            GlobalConfiguration.Configuration.EnsureInitialized();
        }
        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {
            HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
            if (authCookie != null)
            {
                // Get the forms authentication ticket.
                FormsAuthenticationTicket authTicket = FormsAuthentication.Decrypt(authCookie.Value);
                var identity = new GenericIdentity(authTicket.Name, "Forms");
                var principal = new MyPrincipal(identity);

                // Get the custom user data encrypted in the ticket.
                string userData = ((FormsIdentity)(Context.User.Identity)).Ticket.UserData;

                // Deserialize the json data and set it on the custom principal.
                var serializer = new JavaScriptSerializer();
                principal.User = (UserName)serializer.Deserialize(userData, typeof(UserName));

                // Set the context user.
                Context.User = principal;
            }
        }
        protected void Application_Error(object sender, EventArgs e)
        {
            //Exception exeception = Server.GetLastError();
            //Response.Clear();
            //HttpException httpexeception = exeception as HttpException;
            //RouteData route=new RouteData();
            //if (httpexeception != null)
            //{
            //    switch (httpexeception.GetHttpCode())
            //    {
            //        case 404:
            //            route.Values.Add("action", "http404");
            //            break;
            //        case 500:
            //            route.Values.Add("action", "http500");
            //            break;
            //        default:
            //              route.Values.Add("action", "general");
            //            break;
            //    }
            //    Server.ClearError();
            //    Response.TrySkipIisCustomErrors = true;
            //}
            //IController errorcontroller = new ErrorPageController();
            //errorcontroller.Execute(new RequestContext(new HttpContextWrapper(Context), route));



            //Exception ex = Server.GetLastError();

            //HttpException httpex = ex as HttpException;
            //RouteData data = new RouteData();

            //data.Values.Add("controller", "Error");
            //if (httpex != null)
            //{

              

            //    switch (httpex.GetHttpCode())
            //    {
            //        case 404:
            //            data.Values.Add("action", "http404");
            //            break;
            //        case 500:
            //            data.Values.Add("action", "http500");
            //            break;
            //        default:
            //            data.Values.Add("action", "general");
            //            break;
            //    }
            //    Server.ClearError();
            //    Response.TrySkipIisCustomErrors = true;
            //}
            //IController errorcontroller = new ErrorController();
            //errorcontroller.Execute(new RequestContext(new HttpContextWrapper(Context), data));

        }
        protected void Session_Start(object sender, EventArgs e)
        {
            // Code that runs when a new session is started
            Session.Timeout = 15;
            if (Session["UserID"] == null)            
            {
                //Redirect to Login Page if Session is null & Expires                   
                //new RedirectToRouteResult(new RouteValueDictionary { { "Login", "LoginIndex" }, { "controller", "Login" } });
                Response.Redirect("~/Login/LoginIndex");
            }
        }  

    }
}