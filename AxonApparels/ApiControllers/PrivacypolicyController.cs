using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AxonApparels.ApiControllers
{
    public class PrivacypolicyController : ApiController
    {
        [HttpGet]
        [Route("api/privacypolicy")]
        public HttpResponseMessage GetPrivacyPolicy()
        {
            string privacyPolicy = @"
                Privacy Policy
                Introduction
                Your privacy is important to us. This privacy policy explains how our app ('the App') collects, uses, and protects your personal data. We comply with all relevant data protection regulations, including the User Data Policy of the Google Play Store.

                Data We Collect
                Our App may collect the following types of information:
                - Personal Information: such as your name, email address, and contact information.
                - Device Information: such as your device type, operating system, and unique device identifiers.
                - App Usage Data: including the features you use and the time you spend in the app.
                
                How We Use Your Data
                We use the collected data to:
                - Provide and improve app functionality.
                - Analyze app usage to enhance user experience.
                - Communicate with you regarding updates or issues with the app.
                We do not sell, trade, or rent your personal information to others.

                Data Security
                We implement security measures to protect your data from unauthorized access, alteration, or disclosure. However, please note that no system is completely secure, and we cannot guarantee absolute security.

                Children’s Privacy
                Our app is not intended for use by children under the age of 13. If you are a parent or guardian and believe we may have inadvertently collected personal information from a child, please contact us so we can remove the information promptly.

                Changes to this Privacy Policy
                We may update this policy periodically to reflect changes in the app or regulations. We recommend reviewing this policy regularly for updates.

                Contact Us
                If you have any questions about this privacy policy or the way we handle your data, please contact us at:
                Email: jeyaramaxon@gmail.com";

            // Return as plain text
            var response = new HttpResponseMessage
            {
                Content = new StringContent(privacyPolicy)
            };

            // Set the content type to text/plain
            response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("text/plain");
            return response;
        }
    }
}