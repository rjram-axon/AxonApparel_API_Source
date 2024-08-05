using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class StoreTransferMas
    {
        public int MasID { get; set; }
        public string Transno { get; set; }
        public Nullable<System.DateTime> TransDate { get; set; }
        public int FromcompID { get; set; }
        public string Order_No { get; set; }
        public Nullable<int> StyleID { get; set; }
        public string Job_Ord_no { get; set; }
        public string TransType { get; set; }
        public int IssueStoreID { get; set; }
        public Nullable<int> Item_GroupID { get; set; }
        public Nullable<int> ItemID { get; set; }
        public int ToCompID { get; set; }
        public int ToUnitID { get; set; }
        public int RecptStoreID { get; set; }
        public string Remarks { get; set; }
        public string QualityNo { get; set; }
        public Nullable<System.DateTime> QualityDate { get; set; }
        public string QualityMade { get; set; }
        public string QualityRemarks { get; set; }
        public Nullable<int> CreatedBy { get; set; }
        public string EWayNo { get; set; }
        public Nullable<System.DateTime> EWayDate { get; set; }
        public Nullable<int> LocationID { get; set; }
        public string IssueStore { get; set; }
        public string ReceiptStore { get; set; }
        public string RefNo { get; set; }
        public int ChkRecpt { get; set; }
        public string VehicleNo { get; set; }

        public string MainType { get; set; }
        public string insertype { get; set; }

        public IList<StoreTransferDet> StoreTransDet { get; set; }
    }
}
