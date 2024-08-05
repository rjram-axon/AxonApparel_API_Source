using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IMailBusiness
    {
        Response<IList<Domain.MailModel>> LoadMailMainList (string FromName, string ToName, string frmdate, string todate);
        Response<IList<Domain.MailModel>> LoadMailEdit(int? masid);
        Response<IList<Domain.Mail_Attachments>> LoadMailFileEdit(int? masid);

        Response<int> AddMail(Domain.MailModel ProdMasAdd);
    }
}
