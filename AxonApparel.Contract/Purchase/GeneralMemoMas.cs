using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class GeneralMemoMas
   {
       public int Gen_memo_Masid { get; set; }
       public string Gen_memo_No { get; set; }
       public DateTime Gen_memo_date { get; set; }
       public string Gen_memo_RefNo { get; set; }
       public DateTime Gen_memo_Refdate { get; set; }
       public int Companyid { get; set; }
       public string company { get; set; }
       public int UnitId { get; set; }
       public string unit { get; set; }
       public string Unit_or_Other { get; set; }
       public string Remarks { get; set; }
       public string VehicleNo { get; set; }
       public string ReturnOrNo { get; set; }
       public DateTime ReturnDate { get; set; }
       public int RequestnerId { get; set; }
       public string Requestner { get; set; }
       public int CreatedBy { get; set; }
       public string Order_no { get; set; }
       public int ProcessId { get; set; }
       public string process { get; set; }
       public int Company_unitID { get; set; }
       public string companyunit { get; set; }
       public int styleid { get; set; }
       public string style { get; set; }
       public int BuyerId { get; set; }
       public string buyer { get; set; }
       public bool validatebomqtyindelivery { get; set; }
       public int bmasid { get; set; }
       public List<GeneralMemoDet> GenMemDet { get; set; }
    }
}
