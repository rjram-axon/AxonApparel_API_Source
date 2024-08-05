using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace AxonApparel.Domain
{
    public class Supplier
    {
        public int SupplierId { get; set; }
        public int CountSupplierId { get; set; }
        public string SupplierName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public int CityId { get; set; }
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public string CityName { get; set; }
        public string Zipcode { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public int cstno { get; set; }
        public string IsActive { get; set; }
        public DateTime cstdate { get; set; }
        public string TinNo { get; set; }
        public Nullable<DateTime> TinDate { get; set; }
        public string ContactName { get; set; }
        public string MobNo { get; set; }
        public string Supplookup { get; set; }
        public string GSTNO { get; set; }
        public string GstApplicable { get; set; }
        public int AuditSupplierid { get; set; }
        public Nullable<bool> ProcessAll { get; set; }
        public Nullable<bool> PurchaseAll { get; set; }
        public Nullable<bool> ProcessYarn { get; set; }
        public Nullable<bool> ProcessTrims { get; set; }
        public string ProcessSet { get; set; }
        //public List<SelectListItem> CityList { get; set; }
    }
}