using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class FabricDet
    {
        public int Fabric_Req_Masid { get; set; }
        public int Fabric_Req_detid { get; set; }
        public long sno { get; set; }
        public int Itemid { get; set; }
        public int Colorid { get; set; }
        public int Sizeid { get; set; }

        public string item { get; set; }
        public string color { get; set; }
        public string size { get; set; }
        public string combocolor { get; set;}
        public int ComboColorid { get; set; }
        public int Uomid { get; set; }
        public string uom { get; set; }
        public string LotNo { get; set; }
        public string BatchNo { get; set; }
        public decimal AvailStock { get; set; }
        public decimal FabricWt { get; set; }
        public decimal ReqWt { get; set; }
        public int panelid { get; set; }
        public string panel { get; set; }

        public int Companyid { get; set; }
        public string orderno { get; set; }
        public string style { get; set; }
        public int styleid { get; set; }
        public string refno { get; set; }
        public string IntenalOrExternal { get; set; }
        public string OType { get; set; }
        public int Buy_Ord_Masid { get; set; }
        public int DeliScheduleNo { get; set; }
        public decimal PlannedQty { get; set; }
        public decimal PendingQty { get; set; }
        public int ProcessorId { get; set; }
        public string Fabric_Req_no { get; set; }
        public DateTime Fabric_Req_date { get; set; }
        public int panelprdqty { get; set; }
        public decimal freq { get; set; }
        public decimal bal { get; set; }
        public string check { get; set; }

    }
}
