using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;
using System.Data.SqlTypes;
using System.Transactions;
using System.Data.Entity.Validation;

namespace AxonApparel.Repository
{
    public class AccountSettingRepository : IAccountSettingRepository
    { 
        HouseKeepingEntities entities = new HouseKeepingEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();

        public bool UpdateStatus(Repository.PopMailSettings mainlistobj)
        {
            bool reserved = false;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    var MDet = entities.PopMailSettings;

                    foreach (var m in MDet)
                    {
                        entities.PopMailSettings.Remove(m);
                    }
                    entities.SaveChanges();

                  
                    mainlistobj.CcEmailID = "asd";
                    //mainlistobj.ServerName = "";
                   
                    mainlistobj.ToEmailID = "asd";
                    mainlistobj.UseAuthentication = "Y";
                   // mainlistobj.UsePOPAuthentication = "N";
                    mainlistobj.AllowUserPopupSettings = "N";
                  
                  //  mainlistobj.Username = "";

                    entities.PopMailSettings.Add(mainlistobj);
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }

        //public IQueryable<Domain.MisSetting> GetCompany()
        //{

        //    var userdet = (from us in entities.Vw_CompanyLicencePeriod
        //                   select new Domain.MisSetting
        //                   {
        //                       dCompanyId = us.companyID,
        //                       Company = us.COMPANY

        //                   }).AsQueryable();

        //    return userdet;
        //}

        public IQueryable<Domain.PopMailSetting> GetSettingData()
        {

            var settingdata = (from maillistobj in entities.PopMailSettings
                               select new Domain.PopMailSetting
                               {

                                   Userid = maillistobj.Userid,
                                  
                                   ToEmailID = maillistobj.ToEmailID,
                                   CcEmailID = maillistobj.CcEmailID,
                                   AllowMailing = maillistobj.AllowMailing,
                                   AllowUserPopupSettings = maillistobj.AllowUserPopupSettings,
                                   AllowUserMailSettings = maillistobj.AllowUserMailSettings,
                                   AccountName = maillistobj.AccountName,
                                   EMailPassword = maillistobj.EMailPassword,
                                   FromEmailID = maillistobj.FromEmailID,
                                   FromDisplayName = maillistobj.FromDisplayName,
                                   EmailValidation = maillistobj.EmailValidation,
                                   EncodeType = maillistobj.EncodeType,
                                   SMTPHost = maillistobj.SMTPHost,
                                   SMTPPort = maillistobj.SMTPPort,
                                   POP3Host = maillistobj.POP3Host,
                                   POP3Port = maillistobj.POP3Port,
                                   SMTPHostValidation = maillistobj.SMTPHostValidation,
                                   UseAuthentication = maillistobj.UseAuthentication,
                                   UsePOPAuthentication = maillistobj.UsePOPAuthentication,
                                   AsHtml = maillistobj.AsHtml,
                                   ConnectTimeout = maillistobj.ConnectTimeout,
                                   MessageTimeout = maillistobj.MessageTimeout,
                                   ConnectRetry = maillistobj.ConnectRetry,
                                   MaxRecipients = maillistobj.MaxRecipients,
                                  


                               }).AsQueryable();
            return settingdata;
        }

    }
}
