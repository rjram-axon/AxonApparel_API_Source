using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
  
    public class Mail_Attachments
    {
        public int ID { get; set; }
        public int MailId { get; set; }
        public int FileId { get; set; }
        public string FileName { get; set; }
        public string FailPath { get; set; }
    
    }
}
