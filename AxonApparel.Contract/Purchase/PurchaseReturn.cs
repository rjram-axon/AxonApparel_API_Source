using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PurchaseReturn
    {

        public int Return_ID { get; set; }
        public string Return_no { get; set; }
        public DateTime Return_date { get; set; }
        public int CompanyID { get; set; }
        public int SupplierID { get; set; }
        public string Supplier { get; set; }
        public string Company { get; set; }
        public string Remarks { get; set; }
        public string ReturnType { get; set; }
        public int storeid { get; set; }
        public string PurOrGrn { get; set; }
        public string PurOrGrnNo { get; set; }
        public int PurOrGrnNoId { get; set; }
        public int CreatedBy { get; set; }
        public string Ordtype { get; set; }
        public string JobNo { get; set; }
        public int JobNoId { get; set; }
        public string OrderNo { get; set; }
        public string RefNo { get; set; }
        public string EntryType { get; set; }
        public int MfrId { get; set; }
        public int StyleId { get; set; }
        public string Style { get; set; }
        public int Buy_Mas_Id { get; set; }
        public int ParentUnitid { get; set; }
        public string Storetype { get; set; }
        public int StoreUnitID { get; set; }
        public string StoreName { get; set; }

        public List<PurchaseReturnDet> PurReturnDet { get; set; }
    }
}
