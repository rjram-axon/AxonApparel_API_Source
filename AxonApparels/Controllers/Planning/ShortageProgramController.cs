using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Business;

namespace AxonApparels.Controllers.Planning
{
    public class ShortageProgramController : Controller
    {
        //
        // GET: /ShortageProgram/

        public ActionResult ShortageProgramIndex()
        {
            return View();
        }

    }
}
