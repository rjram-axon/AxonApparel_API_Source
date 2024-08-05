using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public class SupplierBusiness : ISupplierBusiness
    {
        private ISupplierRepository strrep = new SupplierRepository();


        public Response<IEnumerable<Domain.Supplier>> GetSupplier()
        {
            try
            {
                var strlist = strrep.GetDataListAll();
                //  int cityid = 0;

                return new Response<IEnumerable<Domain.Supplier>>(strlist.Select(m => new Domain.Supplier
                {
                    IsActive = Convert.ToBoolean(m.IsActive) ? "TRUE" : "FALSE",
                    SupplierId = m.SupplierId,
                    CityId = (int)(m.CityId == null ? 0 : m.CityId),
                    SupplierName = m.SupplierName,
                    Address1 = (m.Address1 == null ? "" : m.Address1),//m.Address1,
                    Address2 = (m.Address2 == null ? "" : m.Address2),//m.Address2,
                    Address3 = (m.Address3 == null ? "" : m.Address3),//m.Address3,
                    Zipcode = (m.Zipcode == null ? "" : m.Zipcode),//m.Zipcode,     
                    CityName = m.CityName,
                    ContactName = m.ContactName,
                    MobNo = m.MobNo,
                    cstno = m.cstno,
                    cstdate = m.cstdate,
                    TinNo = m.TinNo,
                    TinDate = m.TinDate,
                    Email = m.Email,
                    Fax = (m.Fax == null ? "" : m.Fax),

                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Supplier>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Response<Domain.Supplier> GetSupplierId(int SupplierId)
        {
            try
            {
                var st = strrep.GetDataById(SupplierId);
                return new Response<Domain.Supplier>(new Domain.Supplier
                {

                    IsActive = st.IsActive ? "TRUE" : "FALSE",
                    SupplierId = st.SupplierId,
                    CityId = (int)(st.CityId == null ? 0 : st.CityId),
                    CityName = "",
                    Supplookup = (st.LookUp == null ? null : st.LookUp),
                    SupplierName = (st.Supplier1 == null ? "" : st.Supplier1),//m.Supplier1,
                    Address1 = (st.Address1 == null ? "" : st.Address1),//m.Address1,
                    Address2 = (st.Address2 == null ? "" : st.Address2),//m.Address2,
                    Address3 = (st.Address3 == null ? "" : st.Address3),//m.Address3,
                    Zipcode = (st.Zipcode == null ? "" : st.Zipcode),//m.Zipcode,                
                    ContactName = (st.Contact_Name == null ? "" : st.Contact_Name),
                    MobNo = (st.Mob_No == null ?"" : st.Mob_No),
                    cstno = (int)(st.CST_No == null ? 0 : st.CST_No),
                    //cstdate = (DateTime)st.CST_Date,
                    cstdate = (DateTime)(st.CST_Date == null ? DateTime.Now : st.CST_Date),
                    TinNo = (st.TIN_No == null ? "" : st.TIN_No),
                    //TinDate = (DateTime)st.TIN_Date,
                    TinDate = (DateTime)(st.TIN_Date == null ? DateTime.Now : st.TIN_Date),
                    Email = (st.E_Mail == null ? "" : st.E_Mail),
                    Fax = (st.Fax == null ? "" : st.Fax),
                    GSTNO =(st.GSTNO == null ? "" : st.GSTNO),
                    GstApplicable = (st.GstApplicable == null ? "" : st.GstApplicable),
                    AuditSupplierid = (int)st.AuditSupplierid,
                    ProcessAll = st.ProcessAll,
                    PurchaseAll = st.PurchaseAll,
                    ProcessYarn = st.ProcessYarn,
                    ProcessTrims = st.ProcessTrims,
                    ProcessSet = st.ProcessSet

                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.Supplier>(null, Status.ERROR, "OOPS error occured... Please try again later");
            }
        }

        public Response<int> CreateSupplier(Domain.Supplier SupplierAdd)
        {
            try
            {
                int? CitId = 0;

                if (SupplierAdd.CityId == 0)
                {
                    CitId = null;
                }
                else
                {
                    CitId = SupplierAdd.CityId;
                }

                int? CoutId = 0;

                if (SupplierAdd.CountryId == 0)
                {
                    CoutId = null;
                }
                else
                {
                    CoutId = SupplierAdd.CountryId;
                }

                if (string.IsNullOrEmpty(SupplierAdd.SupplierName))
                    return new Response<int>(0, Status.ERROR, "Given Supplier is empty");
                if (isNameAvailableAlready(SupplierAdd, "ADD"))
                    return new Response<int>(-1, Status.ERROR, "Given Supplier is already available");

                return new Response<int>(strrep.AddData(new Repository.Supplier
                {
                    IsActive = SupplierAdd.IsActive.ToUpper() == "TRUE",
                    SupplierId = SupplierAdd.SupplierId,
                    Supplier1 = SupplierAdd.SupplierName.Replace("'", ""),
                    LookUp = SupplierAdd.Supplookup,
                    Address1 = (SupplierAdd.Address1 == null ? null : SupplierAdd.Address1.Replace("'", "")),
                    Address2 = (SupplierAdd.Address2 == null ? null : SupplierAdd.Address2.Replace("'", "")),
                    Address3 = (SupplierAdd.Address3 == null ? null : SupplierAdd.Address3.Replace("'", "")),
                    Zipcode = SupplierAdd.Zipcode,
                    Contact_Name = SupplierAdd.ContactName,
                    Mob_No = SupplierAdd.MobNo,
                    CityId = CitId,
                    CountryId = CoutId,
                    CST_No = SupplierAdd.cstno,
                    CST_Date = SupplierAdd.cstdate,
                    TIN_No = SupplierAdd.TinNo,
                    TIN_Date = SupplierAdd.TinDate,
                    Fax = SupplierAdd.Fax,
                    E_Mail = SupplierAdd.Email,
                    GSTNO = (SupplierAdd.GSTNO == null )? "": SupplierAdd.GSTNO,
                    GstApplicable=SupplierAdd.GstApplicable,
                    AuditSupplierid = SupplierAdd.AuditSupplierid,
                    ProcessAll = SupplierAdd.ProcessAll,
                    PurchaseAll = SupplierAdd.PurchaseAll,
                    ProcessYarn = SupplierAdd.ProcessYarn,
                    ProcessTrims = SupplierAdd.ProcessTrims,
                    ProcessSet = SupplierAdd.ProcessSet
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Response<bool> UpdateSupplier(Domain.Supplier SupplierUpd)
        {

            int? CitId = 0;

            if (SupplierUpd.CityId == 0)
            {
                CitId = null;
            }
            else
            {
                CitId = SupplierUpd.CityId;
            }

            int? CoutId = 0;

            if (SupplierUpd.CountryId == 0)
            {
                CoutId = null;
            }
            else
            {
                CoutId = SupplierUpd.CountryId;
            }

            if (string.IsNullOrEmpty(SupplierUpd.SupplierName))
                return new Response<bool>(false, Status.ERROR, "Given Name of Supplier is empty");
            if (isNameAvailableAlready(SupplierUpd, "UPDATE"))
                return new Response<bool>(false, Status.EXISTS, "Given name of Supplier is already available");

            return new Response<bool>(strrep.UpdateData(new Repository.Supplier
            {
                IsActive = SupplierUpd.IsActive.ToUpper() == "TRUE",
                SupplierId = SupplierUpd.SupplierId,
                Supplier1 = SupplierUpd.SupplierName.Replace("'", ""),
                LookUp = SupplierUpd.Supplookup,
                Address1 = (SupplierUpd.Address1 == null ? null : SupplierUpd.Address1.Replace("'", "")),
                Address2 = (SupplierUpd.Address2 == null ? null : SupplierUpd.Address2.Replace("'", "")),
                Address3 = (SupplierUpd.Address3 == null ? null : SupplierUpd.Address3.Replace("'", "")),
                Zipcode = SupplierUpd.Zipcode,
                CityId = CitId,
                CountryId = CoutId,
                Contact_Name = SupplierUpd.ContactName,
                Mob_No = SupplierUpd.MobNo,
                CST_No = SupplierUpd.cstno,
                CST_Date = SupplierUpd.cstdate,
                TIN_No = SupplierUpd.TinNo,
                TIN_Date = SupplierUpd.TinDate,
                Fax = SupplierUpd.Fax,
                E_Mail = SupplierUpd.Email,
                GSTNO = (SupplierUpd.GSTNO == null) ? "" : SupplierUpd.GSTNO,
                GstApplicable=SupplierUpd.GstApplicable,
                AuditSupplierid = SupplierUpd.AuditSupplierid,
                ProcessAll = SupplierUpd.ProcessAll,
                PurchaseAll = SupplierUpd.PurchaseAll,
                ProcessYarn = SupplierUpd.ProcessYarn,
                ProcessTrims = SupplierUpd.ProcessTrims,
                ProcessSet = SupplierUpd.ProcessSet
            }), Status.SUCCESS, "Updated Successfully");



        }

        public Response<bool> DeleteSupplier(int SupplierId)
        {
            return new Response<bool>(strrep.DeleteData(SupplierId), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.Supplier store, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetSupplier().Value.Where(c => c.SupplierName.ToUpper() == store.SupplierName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetSupplier().Value.Where(c => c.SupplierName.ToUpper() == store.SupplierName.ToUpper() && c.SupplierId != store.SupplierId).ToList().Count > 0);
            }
            return false;

        }


        public Response<IList<Domain.Supplier>> GetSuppCheckItemDetails(int SupplierId)
        {
            try
            {
                var ProductEWO = strrep.GetRepSuppCheckItemDetails(SupplierId);

                return new Response<IList<Domain.Supplier>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Supplier>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IEnumerable<Domain.Supplier>> GetSupplierSetup(int Processid, string Type)
        {
            try
            {
                var strlist = strrep. GetSupplierSetup(Processid,Type);
                //  int cityid = 0;

                return new Response<IEnumerable<Domain.Supplier>>(strlist.Select(m => new Domain.Supplier
                {
                   
                    SupplierId = m.SupplierId,
                    SupplierName = m.SupplierName,
                 

                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Supplier>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }


    }
}
