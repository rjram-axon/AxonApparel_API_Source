using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class Popup_Alert
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public int Userid { get; set; }
        public string User { get; set; }
        public bool Status { get; set; }

        public List<Popup_Alert> PopupAlert { get; set; }
    }
}
