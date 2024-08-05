using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class SpecialReqDet
    {
       public long sno { get; set; }
        public int Spl_Req_Detid { get; set; }
        public int Spl_Reqid { get; set; }
        public int Itemid { get; set; }
        public string item { get; set; }
        public int Colorid { get; set; }
        public string color { get; set; }
        public int Sizeid { get; set; }
        public string size { get; set; }
        public int UOMid { get; set; }
        public string uom { get; set; }
        public decimal Quantity { get; set; }
        public int itmgrpid { get; set; }
        public string itmgrp { get; set; }
        public decimal App_Qty { get; set; }
        public decimal Issue_Qty { get; set; }
        public string ReqType { get; set; }
        public decimal transferIn { get; set; }
        public decimal Order_Qty { get; set; }
        public decimal Received_Qty { get; set; }
        public decimal Cancel_Qty { get; set; }
        public decimal Debit_Qty { get; set; }
        public int Pur_UOMid { get; set; }
        public string puruom { get; set; }
        public decimal ToPurUOM { get; set; }
        public string Conv_Mode { get; set; }
        public string planned { get; set; }
    }
}
