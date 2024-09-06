using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Contract.Api
{
    public class ApiProcessPrgAppdetails
    {
        public int ID { get; set; }
        public string Orderno { get; set; }
        public string ProdPrgNo { get; set; }

        public string Refno { get; set; }
        public string Style { get; set; }
        public Decimal Quantity { get; set; }
        public string Approved { get; set; }
    }
    public class ApiProcessPrgAppOverlaydetails
    {
        public int ID { get; set; }
        public string Orderno { get; set; }
        public string Refno { get; set; }
        public string Style { get; set; }
        public Decimal Quantity { get; set; }
        public int ProdPrgid { get; set; }
        public string ProdPrgNo { get; set; }
        public string Process { get; set; }
        public string ProgramDate { get; set; }
        public string Approved { get; set; }
    }
    public class ProcessPrgAppEdit
    {
        public string ProdPrgNo { get; set; }

        public string Item { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public string Unit { get; set; }
        public Decimal ProgramQuantity { get; set; }
        public string InOrOut { get; set; }
        public string Approved { get; set; }


    }
}
