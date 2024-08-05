using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Contract.Api
{
    public class ApiProfitlossdetaillist
    {
        public Apiprofitlossmasdetail masdetail { get; set; }
        public List<ApiProfitlossdetdetails> detaillist { get; set; }
    }
    public class Apiprofitlossmasdetail {
        public string order_no { get; set; }
        public string Ref_no { get; set; }
        public string style { get; set; }
        public Nullable<decimal> Quantity { get; set; }
        public string GUom { get; set; }
        public string Description { get; set; }
        public string Imagepath { get; set; }
        public decimal Despatchqty { get; set; }
        public Nullable<decimal> Productionqty { get; set; }
        public int AllowancePer { get; set; }
        public string Currency { get; set; }
        public Nullable<decimal> Price { get; set; }
        public decimal Exchange { get; set; }
        public Nullable<decimal> OrderPrice { get; set; }
        public Nullable<decimal> OrderValue { get; set; }
        public Nullable<decimal> Salesprice { get; set; }
        public decimal Salesrate { get; set; }
        public decimal despamount { get; set; }
    }
    public class ApiProfitlossdetdetails
    {
        public string Access_Type { get; set; }
        public string itemgroup { get; set; }
        public Nullable<decimal> EstAmount { get; set; }
        public Nullable<decimal> AppAmount { get; set; }
        public Nullable<decimal> Actualamount { get; set; }
        public Nullable<decimal> InvoiceAmount { get; set; }
        public Nullable<decimal> Diff { get; set; }
        public Nullable<long> sno { get; set; }
        public Nullable<long> ProcessSeqid { get; set; }
    }


}
