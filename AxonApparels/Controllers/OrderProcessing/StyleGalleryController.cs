using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Domain;
using System.Text;
using AxonApparel.Business;
using System.Text.RegularExpressions;
using System.IO;
using AxonApparel.Common;
namespace AxonApparels.Controllers.OrderProcessing
{
    public class StyleGalleryController : Controller
    {
        //
        // GET: /StyleGallery/
        IBuyOrderStyleBusiness BuyOrdobj = new BuyOrdStyleBusiness();

        public ActionResult StyleGalleryIndex()
        {
            List<AxonApparel.Domain.BuyOrdImg> list = new List<AxonApparel.Domain.BuyOrdImg>();
            list = BuyOrdobj.GetStlyeImglist().Value.ToList();
            return View(list);
            //return View();

            //return PartialView("~/Views/StyleGallery/_StyleGalleryPartialIndex.cshtml", list);
        }

        public PartialViewResult StyleGalleryPartial(string Style,string Orderno)
        {
            //List<AxonApparel.Domain.BuyOrdImg> imglist = new List<AxonApparel.Domain.BuyOrdImg>();


            var imglist = BuyOrdobj.GetStlyeImgdet(Style, Orderno).Value.ToList(); 

            return PartialView("~/Views/StyleGallery/_StyleGalleryPartialIndex.cshtml", imglist);
        }
        public ActionResult GetStlyeImgOrder(string Style)
        {
           
           // var list = BuyOrdobj.GetStlyeImgOrder().Value.ToList();
            //return View(list);
            return Json(BuyOrdobj.GetStlyeImgOrder(Style), JsonRequestBehavior.AllowGet);
        }
    }
}
