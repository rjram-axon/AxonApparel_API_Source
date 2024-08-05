using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AxonApparel.Business;
using AxonApparel.Domain;
using System.IO;
using System.Net;
using System.Net.Mail;

namespace AxonApparels.Controllers.HouseKeeping
{
    public class MailController : Controller
    {
        //
        // GET: /Mail/
        IMailBusiness obj = new MailBusiness();
        IAccountSettingBusiness AccSetbus = new AccountSettingBusiness();

        public ActionResult Mail2Index()
        {
            return View();
        }



        [HttpPost]
        public ActionResult Index(MailModel _objModelMail)
        {
            //if (ModelState.IsValid)
            bool sentmail = false;
            try
            {
                //MailMessage mail = new MailMessage();
                //mail.To.Add(_objModelMail.To);
                //mail.From = new MailAddress(_objModelMail.From);
                //mail.Subject = _objModelMail.Subject;
                //string Body = _objModelMail.Body;
                //mail.Body = Body;
                //mail.IsBodyHtml = true;
                //SmtpClient smtp = new SmtpClient();
                //smtp.Host = "smtp.gmail.com";
                //smtp.Port = 587;
                ////smtp.UseDefaultCredentials = true;
                //smtp.Credentials = new System.Net.NetworkCredential("axonnandha96@gmail.com", "Nandha@axon"); // Enter seders User name and password  
                //smtp.UseDefaultCredentials = true;
                //smtp.EnableSsl = true;
                //smtp.Send(mail);
                string smtphost = "";
                int port = 0;

                var result = AccSetbus.GetSettingData();
                foreach (var res in result.Value.ToList())
                {
                    smtphost = res.SMTPHost;
                    port = (int)res.SMTPPort;
                }

                using (MailMessage mm = new MailMessage())
                {
                    mm.To.Add(_objModelMail.To);
                    mm.From = new MailAddress(_objModelMail.Email);
                    mm.Subject = _objModelMail.Subject;
                    mm.Body = _objModelMail.Body;
                    //if (fuAttachment.HasFile)
                    //{
                    //    string FileName = Path.GetFileName(fuAttachment.PostedFile.FileName);
                    //    mm.Attachments.Add(new Attachment(fuAttachment.PostedFile.InputStream, FileName));
                    //}
                    mm.IsBodyHtml = false;
                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = "smtp.gmail.com";
                    smtp.EnableSsl = true;
                    NetworkCredential NetworkCred = new NetworkCredential("", "");
                    smtp.UseDefaultCredentials = true;
                    smtp.Credentials = NetworkCred;
                    smtp.Port = 587;
                    smtp.Send(mm);
                    sentmail = true;
                }


                // return View("Index", _objModelMail);
                return Json(sentmail, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(sentmail, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public ActionResult SentMail(MailModel _objModelMail, List<HttpPostedFileBase> attachments)
        {
            //if (ModelState.IsValid)
            bool sentmail = false;
            List<AxonApparel.Domain.File> upload = new List<AxonApparel.Domain.File>();
            List<AxonApparel.Domain.Mail_Attachments> Mail_Attachments = new List<AxonApparel.Domain.Mail_Attachments>();
            try
            {
                string smtphost = "";
                int port = 0;

                var result = AccSetbus.GetSettingData();
                foreach (var res in result.Value.ToList())
                {
                    smtphost = res.SMTPHost;
                    port = (int)res.SMTPPort;
                }


                using (MailMessage mm = new MailMessage())
                {
                    mm.To.Add(_objModelMail.To);
                    mm.From = new MailAddress(_objModelMail.Email);
                    mm.Subject = _objModelMail.Subject;
                    mm.Body = _objModelMail.Body;
                    if (_objModelMail.CC != null)
                    {
                        string[] CCId = _objModelMail.CC.Split(',');
                        foreach (string CCEmail in CCId)
                        {
                            mm.CC.Add(new MailAddress(CCEmail)); //Adding Multiple CC email Id  
                        }
                    }
                    foreach (HttpPostedFileBase attachment in attachments)
                    {
                        if (attachment != null)
                        {
                            string fileName = Path.GetFileName(attachment.FileName);
                            mm.Attachments.Add(new Attachment(attachment.InputStream, fileName));
                        }
                    }
                    mm.IsBodyHtml = false;
                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = smtphost;
                    smtp.EnableSsl = true;
                    NetworkCredential NetworkCred = new NetworkCredential(_objModelMail.Email, _objModelMail.Password);
                    smtp.UseDefaultCredentials = true;
                    smtp.Credentials = NetworkCred;
                    smtp.Port = port;
                    smtp.Send(mm);
                    sentmail = true;
                }

                UploadsViewModel uploadsViewModel = Session["Uploads"] != null ? Session["Uploads"] as UploadsViewModel : new UploadsViewModel();
                if (uploadsViewModel != null)
                {
                    string TitleVal = "MailUpload";
                    string appPath = AppDomain.CurrentDomain.BaseDirectory;
                    DirectoryInfo di = Directory.CreateDirectory(appPath + "/Uploads/" + TitleVal);
                    long fileid = 0;


                    if (uploadsViewModel.Uploads.Count == 0)
                    {
                        for (var j = 0; j < upload.Count; j++)
                        {
                            upload[0].FileID = uploadsViewModel.Uploads.Count + 1;
                        }
                    }
                    else
                    {
                        for (var j = 0; j < uploadsViewModel.Uploads.Count; j++)
                        {
                            fileid = uploadsViewModel.Uploads[j].FileID;
                        }

                        foreach (AxonApparel.Domain.File up in upload)
                        {
                            up.FileID = fileid + 1;
                        }
                    }

                    if (attachments.Count > 0)
                    {
                        if (attachments[0] != null)
                        {
                            for (var j = 0; j < attachments.Count; j++)
                            {
                                AxonApparel.Domain.File upload1 = new AxonApparel.Domain.File();


                                upload1.FileID = j + 1;
                                upload1.FileName = attachments[j].FileName;
                                upload1.FilePath = "~/Uploads/" + TitleVal + "/" + attachments[j].FileName; ;
                                upload.Add(upload1);
                            }
                        }
                    }
                    if (attachments.Count > 0)
                    {
                        if (attachments[0] != null)
                        {
                            for (var j = 0; j < attachments.Count; j++)
                            {
                                AxonApparel.Domain.Mail_Attachments upload1 = new AxonApparel.Domain.Mail_Attachments();


                                upload1.FileId = j + 1;
                                upload1.FileName = attachments[j].FileName;
                                upload1.FailPath = "~/Uploads/" + TitleVal + "/" + attachments[j].FileName; ;
                                Mail_Attachments.Add(upload1);
                            }

                            _objModelMail.MailFile = Mail_Attachments;
                        }
                    }

                    foreach (HttpPostedFileBase attachment in attachments)
                    {
                        if (attachment != null)
                        {
                            AxonApparel.Domain.File upload1 = new AxonApparel.Domain.File();
                            upload1.FileName = attachment.FileName;
                            upload1.FilePath = "~/Uploads/" + TitleVal + "/" + attachment.FileName; ;

                            attachment.SaveAs(Server.MapPath(upload1.FilePath));

                        }
                    }

                }
                if (sentmail)
                {
                    var ProdMas = obj.AddMail(_objModelMail);
                    return Json(ProdMas, JsonRequestBehavior.AllowGet);

                }
                else
                {
                    return Json(sentmail, JsonRequestBehavior.AllowGet);
                }

            }
            catch (Exception ex)
            {
                return Json(sentmail, JsonRequestBehavior.AllowGet);
            }
        }




        public JsonResult LoadMailMainList(string FromName, string ToName, string frmdate, string todate)
        {

            return Json(obj.LoadMailMainList(FromName, ToName, frmdate, todate), JsonRequestBehavior.AllowGet);
        }


        public JsonResult LoadMailEdit(int? masid)
        {

            return Json(obj.LoadMailEdit(masid), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadMailFileEdit(int? masid)
        {

            return Json(obj.LoadMailFileEdit(masid), JsonRequestBehavior.AllowGet);
        }



        public ActionResult DownloadFile(string filePath)
        {
            bool res = false;
            try
            {
                string fullName = Server.MapPath(filePath);

                byte[] fileBytes = GetFile(fullName);

                return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, filePath);

            }
            catch (Exception ex)
            {

                return Json(res, JsonRequestBehavior.AllowGet);
            }
        }

        byte[] GetFile(string s)
        {
            System.IO.FileStream fs = System.IO.File.OpenRead(s);
            byte[] data = new byte[fs.Length];
            int br = fs.Read(data, 0, data.Length);
            if (br != fs.Length)
                throw new System.IO.IOException(s);
            return data;
        }




        public ActionResult MailLoad(string title,int id,string fmname,string fmmail,string toname,string tomail,string sub,
            string body ,string CC)
        {

            //HttpPostedFileBase file = Request.Files[0];
            MailModel MailViewModel = new MailModel();
             //var result = obj.LoadMailFileEdit(3);


             string TitleVal = title;
             string filename = title + id;
             string FilePath = "~/Uploads/" + TitleVal + "/" + filename + ".pdf";


             List<AxonApparel.Domain.Mail_Attachments> Mail_Attachments = new List<AxonApparel.Domain.Mail_Attachments>();

         
                 AxonApparel.Domain.Mail_Attachments upload1 = new AxonApparel.Domain.Mail_Attachments();


                 upload1.FileId = id;
                 upload1.FileName = filename;
                 upload1.FailPath = FilePath; ;
                 Mail_Attachments.Add(upload1);
          

             MailViewModel.MailFile = Mail_Attachments;

             MailViewModel.To = tomail;
             MailViewModel.ToName = toname;
             MailViewModel.FromName = fmname;
             MailViewModel.Email = fmmail;
             MailViewModel.Subject = sub;
             MailViewModel.Body = body;
             MailViewModel.Subject = sub;
             MailViewModel.CC = CC;

            return PartialView("~/Views/Mail/Mail_PartialVw.cshtml", MailViewModel);


            // return PartialView("~/Views/StyleEntry/_UploadsPartial.cshtml", uploadsViewModel.Uploads);

        }



        public ActionResult MailsentFromReport(MailModel _objModelMail)
        {


            bool sentmail = false;
            try
            {
                string TitleVal = "MailUpload";
                string appPath = AppDomain.CurrentDomain.BaseDirectory;
                DirectoryInfo di = Directory.CreateDirectory(appPath + "/Uploads/" + TitleVal);

                List<AxonApparel.Domain.File> upload = new List<AxonApparel.Domain.File>();
                List<AxonApparel.Domain.Mail_Attachments> Mail_Attachments = new List<AxonApparel.Domain.Mail_Attachments>();

                if (_objModelMail.MailFile != null)
                {

                    for (var j = 0; j < _objModelMail.MailFile.Count; j++)
                    {
                        AxonApparel.Domain.Mail_Attachments upload1 = new AxonApparel.Domain.Mail_Attachments();


                        upload1.FileId = j + 1;
                        upload1.FileName = _objModelMail.MailFile[j].FileName;
                        upload1.FailPath = _objModelMail.MailFile[j].FailPath; ;
                        Mail_Attachments.Add(upload1);
                    }
                }

                string smtphost = "";
                int port = 0;

                var result = AccSetbus.GetSettingData();
                foreach(var res in result.Value.ToList()){
                    smtphost = res.SMTPHost;
                    port = (int)res.SMTPPort;
                }

                using (MailMessage mm = new MailMessage())
                {
                    if (_objModelMail.To != null)
                    {
                        string[] ToId = _objModelMail.To.Split(',');
                        foreach (string ToEmail in ToId)
                        {
                            mm.To.Add(new MailAddress(ToEmail)); //Adding Multiple To email Id  
                        }
                    }

                    //mm.To.Add(_objModelMail.To);
                    mm.From = new MailAddress(_objModelMail.Email);
                    mm.Subject = _objModelMail.Subject;
                    mm.Body = _objModelMail.Body;
                    mm.IsBodyHtml = true;
                    if (_objModelMail.CC != null)
                    {
                        string[] CCId = _objModelMail.CC.Split(',');
                        foreach (string CCEmail in CCId)
                        {
                            mm.CC.Add(new MailAddress(CCEmail)); //Adding Multiple CC email Id  
                        }
                    }
                    foreach (AxonApparel.Domain.Mail_Attachments attachment in Mail_Attachments)
                    {
                        if (attachment != null)
                        {
                            string fileName = Server.MapPath(attachment.FailPath);
                            mm.Attachments.Add(new Attachment(fileName));
                        }
                    }


                    //mm.IsBodyHtml = false;
                    SmtpClient smtp = new SmtpClient();
                   // smtp.Host = "smtp.gmail.com";
                    ServicePointManager.Expect100Continue = true;
                    ServicePointManager.DefaultConnectionLimit = 9999;
                    ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                    smtp.Host = smtphost;
                    smtp.EnableSsl = true;
                    smtp.Timeout = 10000;
                    NetworkCredential NetworkCred = new NetworkCredential(_objModelMail.Email, _objModelMail.Password);
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = NetworkCred;
                    //smtp.Port = 995;
                    smtp.Port = port;
                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;

                    smtp.Send(mm);
                    sentmail = true;
                }
                _objModelMail.MailFile = Mail_Attachments;
              
                if (sentmail)
                {
                    if (_objModelMail.Body.Length > 500) {
                        _objModelMail.Body = "";
                    }


                    var ProdMas = obj.AddMail(_objModelMail);
                    return Json(ProdMas, JsonRequestBehavior.AllowGet);

                }
                else
                {
                    return Json(sentmail, JsonRequestBehavior.AllowGet);
                }

            }
            catch (Exception ex)
            {
                return Json(sentmail, JsonRequestBehavior.AllowGet);
            }







        }







    }
}
