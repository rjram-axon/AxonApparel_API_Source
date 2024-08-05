using AxonApparel.Business;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AxonApparels.Controllers.OrderProcessing
{
    public class CommDocController : Controller
    {
        //
        // GET: /CommDoc/
        ICommDocBusiness obj = new CommDocBusiness();
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult Add(CommDoc str)
        {
            var result = obj.AddImg(str);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetbyID(int ID)
        {
            return Json(obj.GetCommId(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(CommDoc CommUpd)
        {
            return Json(obj.UpdateImg(CommUpd), JsonRequestBehavior.AllowGet);
        }
        public ActionResult NewProject(CommDoc model)
        {
            

            HttpPostedFileBase file = Request.Files[0];
            byte[] imageSize = new byte[file.ContentLength];
            file.InputStream.Read(imageSize, 0, (int)file.ContentLength);
            string image = file.FileName.Split('\\').Last();
            int size = file.ContentLength;

            if (size > 0)
            {
               // string path = Path.Combine(Server.MapPath("~/App_Data/Images/"), Path.GetFileName(file.FileName));
               //// file.SaveAs(Server.MapPath("~/App_Data/" + image.ToString()));
               // file.SaveAs(path);

                var fileName = Path.GetFileName(file.FileName);
                var path = Path.Combine(Server.MapPath("~/App_Data/Images"), fileName);
                file.SaveAs(path);
                
            }

            return Json("File Uploaded Successfully!"); 
        }
    }
}
