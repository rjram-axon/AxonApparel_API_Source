using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace AxonApparel.Domain
{
    public class Ord_styleTempMas
    {
        public int TemDetId { get; set; }
        public int Ord_MasId { get; set; }
        public string Order_No { get; set; }
        public int style_ID { get; set; }
        public string Style { get; set; }
        public int GItemId { get; set; }
        public string GItem { get; set; }
        public int BuyerId { get; set; }
        public string Buyer { get; set; }
        public int TemplateId { get; set; }
        public string Template { get; set; }
        public List<Ord_styleTempDet> ordStyleTempDet { get; set; }
        
    }
}
