using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class Company
    {
        public int CompanyId { get; set; }
        public int CountCompId { get; set; }
        public string CompanyName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public int CityId { get; set; }
        public string CityName { get; set; }
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public int Zipcode { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public string Telex { get; set; }
        public int cstno { get; set; }
        public string IsActive { get; set; }
        public DateTime cstdate { get; set; }
        public int TinNo { get; set; }
        public DateTime TinDate { get; set; }
        public string ContactName { get; set; }
        public decimal MobNo { get; set; }
        public string Complookup { get; set; }
        public int Rbi_code_num { get; set; }
        public string Prefix { get; set; }
        public string LogoName { get; set; }
        public int RCMC_No { get; set; }
        public int EAN_No { get; set; }
        public string Range { get; set; }
        public string Division { get; set; }
        public int AEPC_No { get; set; }
        public DateTime AEPC_Date { get; set; }
        public int IEC_No { get; set; }
        public decimal IE_code { get; set; }
        public int TNGST_No { get; set; }
        public int BCurrencyId { get; set; }
        public string GSTNo { get; set; }
        public string Imgpath { get; set; }
        public string RexNo { get; set; }
        public string PANno { get; set; }
    }
}
