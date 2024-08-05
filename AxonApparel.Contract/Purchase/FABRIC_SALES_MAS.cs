using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
     public  class FABRIC_SALES_MAS
    {

        public int Fabmasid { get; set; }
        public Nullable<int> Companyid { get; set; }
        public Nullable<int> Companyunitid { get; set; }
        public Nullable<int> Supplierid { get; set; }
        public string Entryno { get; set; }
        public Nullable<System.DateTime> EntryDate { get; set; }
        public string Item_type { get; set; }
        public string Remarks { get; set; }
        public Nullable<decimal> GrossAmt { get; set; }
        public Nullable<decimal> ActGrossamt { get; set; }
        public Nullable<decimal> Addlessamt { get; set; }
        public Nullable<decimal> NetAmt { get; set; }
        public Nullable<int> currencyid { get; set; }
        public Nullable<decimal> exchangerate { get; set; }
        public string dcno { get; set; }
        public Nullable<int> shipto { get; set; }
        public string invtype { get; set; }
        public Nullable<System.DateTime> Dcdate { get; set; }
        public string Supplier { get; set; }

        public List <FABRIC_SALES_DET> FABRIC_SALES_DET { get; set; }
        public List <FabricSales_AddLess> FabricSales_AddLess { get; set; }


    }
}
