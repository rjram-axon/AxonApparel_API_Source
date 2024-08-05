using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class StockTransfer
    {

        public int TransferId { get; set; }
        public DateTime TransDate { get; set; }
        public int FromCompId { get; set; }
        public int ToCompId { get; set; }
        public string ToComp { get; set; }
        public string FroComp { get; set; }
        public int FromStyleid { get; set; }
        public int ToStyleid { get; set; }

        public string FromStyle { get; set; }
        public string ToStyle { get; set; }
        public int ItemGroupId { get; set; }
        public string ItemGroup { get; set; }
        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int Processid { get; set; }
        public string Process { get; set; }
        public int FromStoreUnitID { get; set; }
        public int ToStoreUnitID { get; set; }
        public int CreatedBy { get; set; }
        public int FromLotid { get; set; }

        public int ToLotid { get; set; }
        public int MillId { get; set; }
        public string TransNo { get; set; }
        public string FTransType { get; set; }
        public string TTransType { get; set; }
        public string FromRef { get; set; }
        public string ToRef { get; set; }
        public string FOrdNo { get; set; }
        public string TOrdNo { get; set; }

        public int FBMasId { get; set; }
        public int TBMasId { get; set; }


        public string FJOrdNo { get; set; }
        public string TJOrdNo { get; set; }

        public int FJobId { get; set; }
        public int TJobId { get; set; }

        public string IsLotStock { get; set; }
        public string SizeFlag { get; set; }
        public string Remarks { get; set; }
        public string FSTransType { get; set; }
        public string TSTransType { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public List<StockTransferDet> StockTransDet { get; set; }
    }

}
