using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class MailModel
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FromName { get; set; }
        public string ToName { get; set; }
        public int ID { get; set; }
        public DateTime Date { get; set; }
        public string Pending { get; set; }
        public string Active { get; set; }
        public string CC { get; set; }
        public IList<Mail_Attachments> MailFile { get; set; }
    } 
}
