using AxonApparel.Common;
using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public class Unit_of_measurementBusiness:IUnit_of_measurementBusiness
    {
        private IUnit_of_measurementRepository strrep = new Unit_of_measurementRepository();


        public Common.Response<IEnumerable<Domain.Unit_of_measurement>> GetUom()
        {
            try
            {
                var strlist = strrep.GetDataListAll();
                return new Response<IEnumerable<Domain.Unit_of_measurement>>(strlist.Select(m => new Domain.Unit_of_measurement
                {
                    IsActive = m.IsActive ? "TRUE" : "FALSE",
                    Uom=m.Uom,
                    UomId=m.UomId,
                    Abbreviation=m.Abbreviation,
                    IsDecimal=m.IsDecimal
                    
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Unit_of_measurement>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Common.Response<Domain.Unit_of_measurement> GetUomId(int UomId)
        {
            try
            {
                var str = strrep.GetDataById(UomId);
                return new Response<Domain.Unit_of_measurement>(new Domain.Unit_of_measurement
                {
                    IsActive = str.IsActive ? "TRUE" : "FALSE",
                    UomId=str.UomId,
                    Uom=str.Uom,
                    Abbreviation=str.Abbreviation,
                    IsDecimal=str.IsDecimal
                   
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.Unit_of_measurement>(null, Status.ERROR, "OOPS error occured... Please try again later");
            }
        }

        public Common.Response<int> CreateUom(Domain.Unit_of_measurement UomAdd)
        {
            try
            {
                if (string.IsNullOrEmpty(UomAdd.Uom))
                    return new Response<int>(0, Status.ERROR, "Given Uom is empty");
                if (isNameAvailableAlready(UomAdd, "ADD"))
                    return new Response<int>(-1, Status.ERROR, "Given Uom is already available");

                return new Response<int>(strrep.AddData(new Repository.Unit_of_measurement
                {
                    IsActive = UomAdd.IsActive.ToUpper() == "TRUE",
                    Abbreviation=UomAdd.Abbreviation,
                    Uom=UomAdd.Uom,
                    UomId=UomAdd.UomId,
                    IsDecimal=UomAdd.IsDecimal
                   }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Common.Response<bool> UpdateUom(Domain.Unit_of_measurement UomUpd)
        {
            if (string.IsNullOrEmpty(UomUpd.Uom))
                return new Response<bool>(false, Status.ERROR, "Given Uom is empty");
            if (isNameAvailableAlready(UomUpd, "UPDATE"))
                return new Response<bool>(false, Status.EXISTS, "Given Uom is already available");

            return new Response<bool>(strrep.UpdateData(new Repository.Unit_of_measurement
            {
                IsActive = UomUpd.IsActive.ToUpper() == "TRUE",
                UomId=UomUpd.UomId,
                Uom=UomUpd.Uom,
                Abbreviation=UomUpd.Abbreviation,
                IsDecimal=UomUpd.IsDecimal
               }), Status.SUCCESS, "Updated Successfully");
        }

        public Common.Response<bool> DeleteUom(int UomId)
        {
            return new Response<bool>(strrep.DeleteData(UomId), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.Unit_of_measurement st, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetUom().Value.Where(c => c.Uom.ToUpper() == st.Uom.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetUom().Value.Where(c => c.Uom.ToUpper() == st.Uom.ToUpper() && c.UomId != st.UomId).ToList().Count > 0);
            }
            return false;

        }



        public Response<IList<Domain.Unit_of_measurement>> GetUomCheckItemDetails(int UomId)
        {
            try
            {
                var ProductEWO = strrep.GetRepUomCheckItemDetails(UomId);

                return new Response<IList<Domain.Unit_of_measurement>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Unit_of_measurement>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
