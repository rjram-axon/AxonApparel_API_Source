using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public class Hsnbusiness : IHsnbusiness
    {
        IHsnRepository hsnRep = new HsnRepository();
        public Response<IEnumerable<HSNCode>> GetHSNCode()
        {
            try
            {

                var accheList = hsnRep.GetDataListAll();

                return new Response<IEnumerable<HSNCode>>(accheList.Select(m => new HSNCode
                {
                    HSNid = m.HSNid,
                    HSNcode = m.HSNcode,
                    HSNdesc = m.HSNdesc,
                    Ttype = m.Ttype,
                    sortorder = m.sortorder,
                    GSTtaxcode = m.GSTtaxcode,
                    IGSTtaxcode = m.IGSTtaxcode,
                    enteredby = m.enteredby,
                    modifiedby = m.modifiedby,
                    modifiedDate = m.modifiedDate

                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IEnumerable<HSNCode>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IEnumerable<Domain.GSTModel>> LoadGstDetail()
        {
            try
            {

                var LoadGstDetail = hsnRep.LoadGstDetail();

                return new Response<IEnumerable<Domain.GSTModel>>(LoadGstDetail.Select(m => new Domain.GSTModel
                {                                  
                    GSTtaxcode = m.GSTtaxcode,
                    id=m.id,              
                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.GSTModel>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IEnumerable<Domain.GSTModel>> LoadIGstDetail()
        {
            try
            {

                var LoadIGstDetail = hsnRep.LoadIGstDetail();

                return new Response<IEnumerable<Domain.GSTModel>>(LoadIGstDetail.Select(m => new Domain.GSTModel
                {
                    GSTtaxcode = m.GSTtaxcode,
                    id = m.id,
                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.GSTModel>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<HSNCode> GetDataById(int HSNid)
        {
            try
            {

                var hsn = hsnRep.GetDataById(HSNid);

                return new Response<HSNCode>(new HSNCode
                {
                    HSNid = hsn.HSNid,
                    HSNcode = hsn.HSNcode,
                    HSNdesc = hsn.HSNdesc,
                    Ttype = hsn.Ttype,
                    sortorder = hsn.sortorder,
                    GSTtaxcode = hsn.GSTtaxcode,
                    IGSTtaxcode = hsn.IGSTtaxcode,
                    enteredby = hsn.enteredby,
                    modifiedby = hsn.modifiedby,
                    modifiedDate = hsn.modifiedDate,
                    rstatus=hsn.rstatus,
                }, Status.SUCCESS, "Fetched Successfully");

            }
            catch
            {
                return new Response<HSNCode>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreateHSNCode(HSNCode HSNCode)
        {
            try
            {
                if (string.IsNullOrEmpty(HSNCode.HSNcode)) return new Response<int>(0, Status.ERROR, "Given HSNCode is empty");
                if (isNameAvailableAlready(HSNCode, "ADD")) return new Response<int>(-1, Status.ERROR, "Given HSNCode is already available");
               
                if (string.IsNullOrEmpty(HSNCode.modifiedby))
                {
                    HSNCode.modifiedby = "";
                }
                if (string.IsNullOrEmpty(HSNCode.Ttype))
                {
                    HSNCode.Ttype = "";
                }
                if (string.IsNullOrEmpty((HSNCode.sortorder).ToString()))
                {
                    HSNCode.sortorder = 0;
                }
                HSNCode.enteredDate = DateTime.Now;
                HSNCode.modifiedDate = DateTime.Now;
                return new Response<int>(hsnRep.AddData(new Repository.Acc_HSNMaster
                {
                    HSNid = HSNCode.HSNid,
                    HSNcode = HSNCode.HSNcode,
                    HSNdesc = HSNCode.HSNdesc,
                    Ttype = HSNCode.Ttype,
                    sortorder = HSNCode.sortorder,
                    GSTtaxcode = HSNCode.GSTtaxcode,
                    IGSTtaxcode = HSNCode.IGSTtaxcode,
                    enteredby = HSNCode.enteredby,
                    modifiedby = HSNCode.modifiedby,
                    modifiedDate = HSNCode.modifiedDate,
                    rstatus=HSNCode.rstatus,
                    enteredDate = HSNCode.enteredDate,
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        private bool isNameAvailableAlready(HSNCode HSNCode, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetHSNCode().Value.Where(c => c.HSNcode.ToUpper() == HSNCode.HSNcode.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetHSNCode().Value.Where(c => c.HSNcode.ToUpper() == HSNCode.HSNcode.ToUpper() && c.HSNid != HSNCode.HSNid).ToList().Count > 0);
            }
            return false;
        }

        public Response<bool> UpdateHSNCode(HSNCode HSNCode)
        {
            if (string.IsNullOrEmpty(HSNCode.HSNcode)) return new Response<bool>(false, Status.ERROR, "Given HSN is empty");
            if (isNameAvailableAlready(HSNCode, "UPDATE")) return new Response<bool>(false, Status.EXISTS, "Given HSN is already available");
            if (string.IsNullOrEmpty(HSNCode.enteredby))
            {
                HSNCode.enteredby = "";
            }
            if (string.IsNullOrEmpty(HSNCode.Ttype))
            {
                HSNCode.Ttype = "";
            }
            if (string.IsNullOrEmpty((HSNCode.sortorder).ToString()))
            {
                HSNCode.sortorder = 0;
            }
            HSNCode.enteredDate = DateTime.Now;
            HSNCode.modifiedDate = DateTime.Now;
            
                return new Response<bool>(hsnRep.UpdateData(new Repository.Acc_HSNMaster
                {
                    HSNid = HSNCode.HSNid,
                    HSNcode = HSNCode.HSNcode,
                    HSNdesc = HSNCode.HSNdesc,
                    Ttype = HSNCode.Ttype,
                    sortorder = HSNCode.sortorder,
                    GSTtaxcode = HSNCode.GSTtaxcode,
                    IGSTtaxcode = HSNCode.IGSTtaxcode,
                    enteredby = HSNCode.enteredby,
                    modifiedby = HSNCode.modifiedby,
                    modifiedDate = HSNCode.modifiedDate,
                    rstatus = HSNCode.rstatus,
                    enteredDate = HSNCode.enteredDate,
                }), Status.SUCCESS, "Added Successfully");
            }
        

        public Response<bool> DeleteHSNCode(int HSNid)
        {
            return new Response<bool>(hsnRep.DeleteData(HSNid), Status.SUCCESS, "Deleted Successfully");
        }

        public Response<IEnumerable<HSNCode>> GetHSNCodeCheckItemDetails(int HSNid)
        {
            try
            {
                var ProductEWO = hsnRep.GetRepHsncodeCheckItemDetails(HSNid);

                return new Response<IEnumerable<HSNCode>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IEnumerable<HSNCode>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}

