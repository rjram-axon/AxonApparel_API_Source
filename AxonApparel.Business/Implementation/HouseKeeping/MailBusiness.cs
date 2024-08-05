using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
  
    public class MailBusiness :IMailBusiness
    {
        IMailRepository repo = new MailRepository();

        public Response<IList<Domain.MailModel>> LoadMailMainList(string FromName, string ToName, string frmdate, string todate)
        {
            try
            {

                var ProductWO = repo.LoadMailMainList(FromName, ToName, frmdate, todate);

                return new Response<IList<Domain.MailModel>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.MailModel>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<Domain.MailModel>> LoadMailEdit(int? masid)
        {
            try
            {

                var ProductWO = repo.LoadMailEdit(masid);

                return new Response<IList<Domain.MailModel>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.MailModel>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.Mail_Attachments>> LoadMailFileEdit(int? masid)
        {
            try
            {

                var ProductWO = repo.LoadMailFileEdit(masid);

                return new Response<IList<Domain.Mail_Attachments>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Mail_Attachments>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> AddMail(Domain.MailModel ProdMasAdd)
        {

            decimal CsecQty = 0;
            try
            {
                AxonApparel.Repository.Mail MailmasInsert = new AxonApparel.Repository.Mail
                {
                    FromMail = ProdMasAdd.Email,
                    FromName = ProdMasAdd.FromName,
                    ToMail = ProdMasAdd.To,
                    ToName = ProdMasAdd.ToName,
                    Subject = ProdMasAdd.Subject,
                    Body = ProdMasAdd.Body,
                    Password = ProdMasAdd.Password,

                };
                var AttachDet = new List<Repository.Mail_Attachments>();

                if (ProdMasAdd.MailFile != null)
                {
                    if (ProdMasAdd.MailFile.Count > 0)
                    {
                        foreach (var item in ProdMasAdd.MailFile)
                        {
                            AttachDet.Add(new Repository.Mail_Attachments
                            {
                                ID = 0,
                                MailId = 0,
                                FileId = item.FileId,
                                FileName = item.FileName,
                                FailPath = item.FailPath,
                              
                            });
                        }
                    }
                }



                var result = repo.AddMail(MailmasInsert, AttachDet, "Add");
                return new Response<int>(1, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception ex)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }




    }
}
