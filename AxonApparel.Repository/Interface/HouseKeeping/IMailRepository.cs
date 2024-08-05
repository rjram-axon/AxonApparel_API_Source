using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IMailRepository
    {
        IList<Domain.MailModel> LoadMailMainList(string FromName, string ToName, string frmdate, string todate);
        IList<Domain.MailModel> LoadMailEdit(int? masid);
        IList<Domain.Mail_Attachments> LoadMailFileEdit(int? masid);

        bool AddMail(Mail MailmasInsert, List<Mail_Attachments> AttachDet, string Mode);
    }
}
