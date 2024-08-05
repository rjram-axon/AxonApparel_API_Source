using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class ProductionReturnItemDet
    {
       public int prodjobdetid { get; set; }
       public int prodordid { get; set; }
       public int prodorddetid { get; set; }
       public int cmpid { get; set; }
       public int suppid { get; set; }
       public string jobordno { get; set; }
       public string prodprgno { get; set; }
       public string productionord { get; set; }
       public int itmid { get; set; }
       public string itm { get; set; }
       public int colorid { get; set; }
       public string color { get; set; }
       public int sizeid { get; set; }
       public string size { get; set; }
       public string refno { get; set; }
       public int styleid { get; set; }
       public string style { get; set; }
       public decimal retqty { get; set; }
       public decimal lossqty { get; set; }
       public string lotno { get; set; }
       public int prodprgdetid { get; set; }

       public int uomid { get; set; }
       public int stockid { get; set; }

       public int Production_Recpt_Retid { get; set; }
       public int Production_Recpt_masid { get; set; }
       //public string LotNo { get; set; }
       //public int ProcessOrdId { get; set; }
       public int Prod_Iss_Stockid { get; set; }
       //public decimal Returnqty { get; set; }
       //public decimal LossQty { get; set; }
       //public int ProcessJobDetid { get; set; }
       //public int ProdIssueJobId { get; set; }
       public int CreatedBy { get; set; }
       public decimal Maruprate { get; set; }
       public decimal Rate { get; set; }
    }
}
