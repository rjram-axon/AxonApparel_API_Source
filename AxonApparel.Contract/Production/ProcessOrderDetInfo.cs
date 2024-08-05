using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProcessOrderDetInfo
    {
        public int itmid { get; set; }
        public string itm { get; set; }
        public int clrid { get; set; }
        public string clr { get; set; }
        public int sizeid { get; set; }
        public string size { get; set; }
        public int plansizeid { get; set; }
        public string plansize { get; set; }
        public int sno { get; set; }
        public decimal TaxAppVal { get; set; }

        public int IssSizeid { get; set; }
        public string IssSize { get; set; }

        public decimal prgopqty { get; set; }
        public decimal ordqty { get; set; }
        public decimal bal { get; set; }
        public string inrout { get; set; }
        public string isdeci { get; set; }
        public decimal rate { get; set; }
        public decimal apprate { get; set; }

        public string jobordno { get; set; }
        public int prgdetid { get; set; }
        public string prodpgmno { get; set; }
        public decimal issqty { get; set; }

        public decimal issues { get; set; }
        public string process { get; set; }
        public string lotno { get; set; }
        public int stockid { get; set; }
        public int prodstkid { get; set; }
        public int procorddetid { get; set; }
        public int procissid { get; set; }
        public int procissdetid { get; set; }
        public int procissjobid { get; set; }
        public int procordjobid { get; set; }
        public string TransNo { get; set; }
        public int disploc { get; set; }
        public string disptype { get; set; }
        public int issloc { get; set; }
        public string isstype { get; set; }
        public string Loop_Len { get; set; }
        public string Gauge { get; set; }
        public decimal SecQty { get; set; }
        public string refno { get; set; }
        public string orderno { get; set; }
        public string style { get; set; }
        public int FinDiaid { get; set; }
        public string FinDia { get; set; }
        public decimal FinGsm { get; set; }
        public int opitmid { get; set; }
        public string opitm { get; set; }
        public int opclrid { get; set; }
        public string opclr { get; set; }
        public int opsizeid { get; set; }
        public string opsize { get; set; }
        public string supplier { get; set; }
        public string opuom { get; set; }
        public string ipuom { get; set; }
        public int ipuomid { get; set; }
        public int opuomid { get; set; }
        public int FabricId { get; set; }
        public int SlNo { get; set; }
        public decimal YarnPer { get; set; }
        public decimal LossPer { get; set; }
        public decimal LossQty { get; set; }
        public decimal LossBalQty { get; set; }
        public int Fabric_ColorId { get; set; }
        public int ProcessIssStockId { get; set; }
        public string ProgramType { get; set; }

        public decimal AllowPer { get; set; }
        public decimal QtywithoutAllow { get; set; }
        public decimal Markup_Rate { get; set; }

        public string buyer { get; set; }
    }
}
