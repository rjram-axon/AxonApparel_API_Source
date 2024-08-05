using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class Budget
    {
       
      
       public string buyer { get; set; }

       public long Snumb { get; set; }
       public int sno { get; set; }
       public int Cost_Defn_BOMid { get; set; }
       public int Buy_Ord_BOMDetid { get; set; }
       public int Buy_Ord_BOMid { get; set; }
       public int Itemid { get; set; }
       public string Itemname { get; set; }
       public int Colorid { get; set; }
       public string Color { get; set; }
       public int Sizeid { get; set; }
       public string Size { get; set; }
       public int Itemgroupid { get; set; }
       public string Itemgroup { get; set; }     
       public string Orderno { get; set; }
       public int styleid { get; set; }
       public string Category1 { get; set; }
       public string Category2 { get; set; }
       public string Category3 { get; set; }
       public decimal Quantity { get; set; }
       public decimal Itmrate { get; set; }
       public decimal Amnt { get; set; }

       public int companyid { get; set; }
       public int buyerid { get; set; }

       public int processid { get; set; }
       public string processname { get; set; }
       public int itemgrpid { get; set; }
       public string itemgrp { get; set; }
       public int processseqmasid { get; set; }
       public int processseqid { get; set; }
       public int costdefnbomid { get; set; }
       public int stageschedule { get; set; }
       //public int rate { get; set; }
       public decimal secqnt { get; set; }
       public string issecqnt { get; set; }

       public int componentid { get; set; }
       public string component { get; set; }
       public int sizerow { get; set; }

       public int costdefnid { get; set; }
       public string costdefnno { get; set; }
       public string currency { get; set; }
       public int currencyid { get; set; }
       public int currid { get; set; }
       public int costdefncomid { get; set; }
       public int particularid { get; set; }
       public string particular { get; set; }
       public decimal cost { get; set; }
       public decimal actualcost { get; set; }
       public string remarks { get; set; }
       public string commercial { get; set; }
       public decimal rate { get; set; }
       public string POno { get; set; }
       public DateTime PoDate { get; set; }

       public decimal salesprice { get; set; }
       public decimal saleprofit { get; set; }
       public decimal drawbackper { get; set; }
       public decimal saleper { get; set; }

       public string refno { get; set; }
       public decimal Exchange { get; set; }
       public int decimalplace { get; set; }
       public decimal Value { get; set; }
       public int stylerowid { get; set; }
       public string style { get; set; }
       public string Supplier { get; set; }

       public string itmtype { get; set; }
       public decimal CMCost { get; set; }
       public decimal FinPer { get; set; }
       public decimal MarkUpvalue { get; set; }
       public int uomid { get; set; }

       public decimal Gaficharges { get; set; }
       public decimal Qizcharges { get; set; }

       public decimal ImpCharges { get; set; }
       public decimal ExpCharges { get; set; }

       public decimal FinPerValue { get; set; }
       public decimal GafichargesValue { get; set; }
       public decimal QizchargesValue { get; set; }
       public decimal ImpChargesValue { get; set; }
       public decimal ExpChargesValue { get; set; }
       public decimal ShipRate { get; set; }
       public decimal OrderValue { get; set; }
       public int bomcurrencyid { get; set; }
       public decimal bomexrate { get; set; }
       public decimal bomcurrate { get; set; }
       public string BuyerMerchendiser { get; set; }
       public string DispOpt { get; set; }
       public int ModifyBy { get; set; }
       public DateTime ModifyDate { get; set; }
       public string AccessType { get; set; }
       public Nullable<decimal> ProfitPercent { get; set; }
       public decimal apprate { get; set; }
       public string CostType { get; set; }
       public Nullable<decimal> Salesratemargin { get; set; }
       public decimal TransferinQuantity { get; set; }
   }
}
