using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class UnitGrnMas
    {
        public int Unit_GRN_Masid { get; set; }
        public string ReceiptCat { get; set; }
        public string Job_Ord_No { get; set; }
        public string Unit_GRN_No { get; set; }
        public DateTime Unit_GRN_date { get; set; }
        public string Unit_GRN_RefNo { get; set; }
        public DateTime Unit_GRN_RefDate { get; set; }
        public string Remarks { get; set; }
        public int FromUnit { get; set; }
        public string fromunitnam { get; set; }
        public int CompanyUnitid { get; set; }
        public int Companyid { get; set; }
        public string company { get; set; }
        public string CommitCancel { get; set; }
        public int ForUnit { get; set; }
        public string forunitnam { get; set; }
        public string RecOrRet { get; set; }
        public string UnitOrOther { get; set; }
        public int ProcessId { get; set; }
        public string Process { get; set; }
        public int StoreUnitID { get; set; }
        public int CreatedBy { get; set; }
        public int FromDivision { get; set; }
        public int ForDivision { get; set; }
        public string style { get; set; }
        public int styleid { get; set; }
        public int BmasId { get; set; }
        public int JmasId { get; set; }
        public string orderno { get; set; }
        public string refno{get;set;}
        public string reference { get; set; }

        public int ParentUnitid { get; set; }
        public string Storetype { get; set; }
        public string StoreName { get; set; }

        public List<UnitGrnDet> GrnDet { get; set; }
        public List<ItmStkDet> ItmstockDet { get; set; }
       
    }
}
