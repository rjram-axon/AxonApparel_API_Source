using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class ProcessReturnItemDet
    {
        public int procjobdetid { get; set; }
        public int procordid { get; set; }
        public int procorddetid { get; set; }
        public int cmpid { get; set; }
        public int suppid { get; set; }
        public int processid { get; set; }
        public string jobordno { get; set; }
        public string ordno { get; set; }
        public string prodprgno { get; set; }
        public string processord { get; set; }
        public int itmid { get; set; }
        public string itm { get; set; }
        public int colorid { get; set; }
        public string color { get; set; }
        public int sizeid { get; set; }
        public string size { get; set; }
        public int plansizeid { get; set; }
        public string plansize { get; set; }
        public string refno { get; set; }
        public int styleid { get; set; }
        public string style { get; set; }
        public decimal retqty { get; set; }
        public decimal lossqty { get; set; }
        public string lotno { get; set; }
        public int prodprgdetid { get; set; }


        public int proissmasid { get; set; }
        public int proissdetid { get; set; }
        public int proissjobid { get; set; }
        public int proissstkid { get; set; }

        public int uomid { get; set; }
        public int stockid { get; set; }

        public int Process_Recpt_Retid { get; set; }
        public int Process_Recpt_masid { get; set; }
        //public string LotNo { get; set; }
        //public int ProcessOrdId { get; set; }
        public int Proc_Iss_Stockid { get; set; }
        //public decimal Returnqty { get; set; }
        //public decimal LossQty { get; set; }
        //public int ProcessJobDetid { get; set; }
        //public int ProdIssueJobId { get; set; }
        public int CreatedBy { get; set; }

        public decimal cancelqty { get; set; }
        public decimal oldoutcancelqty { get; set; }
        public decimal oldincancelqty { get; set; }
        public decimal secqty { get; set; }

        public decimal ordqty { get; set; }
        public decimal bal { get; set; }
        public int proccanceljobdetid { get; set; }
        public int proccancelmasid { get; set; }
        public int proccancelorddetid { get; set; }
        public decimal Maruprate { get; set; }
        public decimal Rate { get; set; }
        public int opitmid { get; set; }
        public int opcolorid { get; set; }
        public int opsizeid { get; set; }
        public string cuttorsew { get; set; }
    }
}
