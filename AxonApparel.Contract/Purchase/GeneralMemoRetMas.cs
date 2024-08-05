using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class GeneralMemoRetMas
    {
        public int Gen_MemoRet_MasId { get; set; }
        public string GenMemo_RetNo { get; set; }
        public string GenMemoRet_RefNo { get; set; }
        public DateTime GenMemoRetDate { get; set; }
        public int Gen_memo_Masid { get; set; }
        public int CompanyId { get; set; }
        public string company { get; set; }
        public int UnitId { get; set; }
        public string unit { get; set; }
        public string Unit_or_Other { get; set; }
        public string Remarks { get; set; }
        public string VehicleNo { get; set; }
        public DateTime GenmemoRet_Refdate { get; set; }
        public string MemoType { get; set; }
        public int CreatedBy { get; set; }
        public int Company_unitID { get; set; }
        public string companyunit { get; set; }
        public int buyerid { get; set; }
        public string buyer { get; set; }
        public List<GeneralMemoRetDet> GenMemDet { get; set; }
    }
}
