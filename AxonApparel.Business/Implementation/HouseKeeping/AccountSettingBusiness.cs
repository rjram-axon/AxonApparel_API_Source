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
    public class AccountSettingBusiness : IAccountSettingBusiness
    {
        IAccountSettingRepository Rep = new AccountSettingRepository();

        public Response<bool> UpdateStatus(PopMailSetting maillistobj)
        {
            Repository.PopMailSettings updateobj = new Repository.PopMailSettings
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
               

            };

            var result = Rep.UpdateStatus(updateobj);

            return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

        }

        public Response<IQueryable<Domain.PopMailSetting>> GetSettingData()
        {
            try
            {
                var detList = Rep.GetSettingData();

                return new Response<IQueryable<Domain.PopMailSetting>>(detList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.PopMailSetting>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

    }
}
