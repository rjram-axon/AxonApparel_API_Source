﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AxonApparels.Controllers
{
    public class ErrorController : Controller
    {
        //
        // GET: /ErrorPage/

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult http404()
        {
            return View();
        }

        public ActionResult http500()
        {
            return View();
        }
        public ActionResult general()
        {
            return View();
        }
    }
}
