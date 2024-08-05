using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AxonApparel.Common;
using AxonApparel.Domain;
using AxonApparel.Repository;

namespace AxonApparel.Business
{
    public class ConsigneeBusiness : IConsigneeBusiness
    {
        private IConsigneeRepository strrep = new ConsigneeRepository();

        public Response<IEnumerable<Domain.Consignee>> GetConsignee()
        {
            try
            {
                var strlist = strrep.GetDataListAll();

                return new Response<IEnumerable<Domain.Consignee>>(strlist.Select(m => new Domain.Consignee
                {
                    IsActive = Convert.ToBoolean(m.IsActive) ? "TRUE" : "FALSE",
                    ConsigneeId = m.ConsigneeId,
                    CityId = (int)(m.CityId == null ? 0 : m.CityId),
                    CityName = m.CityName,
                    ConsigneeName = m.ConsigneeName,
                    Address1 = (m.Address1 == null ? "0" : m.Address1),//m.Address1,
                    Address2 = (m.Address2 == null ? "0" : m.Address2),//m.Address2,
                    Address3 = (m.Address3 == null ? "0" : m.Address3),//m.Address3,
                    Zipcode = m.Zipcode,
                    Remarks = m.Remarks,
                    Lookup = m.Lookup,
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Consignee>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Response<Domain.Consignee> GetConsigneeId(int ConsigneeId)
        {
            try
            {
                var str = strrep.GetDataById(ConsigneeId);
                return new Response<Domain.Consignee>(new Domain.Consignee
                {

                    IsActive = str.IsActive ? "TRUE" : "FALSE",
                    ConsigneeId = str.ConsigneeId,
                    CityId = (int)(str.CityId == null ? 0 : str.CityId),
                    CityName = "",//(str.CityId == null ? "0" : str.City.City1),
                    ConsigneeName = (str.Consignee1 == null ? "0" : str.Consignee1),//m.Consignee1,
                    Address1 = (str.Address1 == null ? "0" : str.Address1),//m.Address1,
                    Address2 = (str.Address2 == null ? "0" : str.Address2),//m.Address2,
                    Address3 = (str.Address3 == null ? "0" : str.Address3),//m.Address3,
                    Zipcode = str.Zipcode,
                    Remarks = (str.Remarks == null ? "" : str.Remarks),//m.Remarks,
                    Lookup = str.Consignee_Lookup
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.Consignee>(null, Status.ERROR, "OOPS error occured... Please try again later");
            }
        }

        public Response<int> CreateConsignee(Domain.Consignee ConsigneeAdd)
        {
            try
            {
                int? CitId = 0;

                if (ConsigneeAdd.CityId == 0)
                {
                    CitId = null;
                }
                else
                {
                    CitId = ConsigneeAdd.CityId;
                }
                if (string.IsNullOrEmpty(ConsigneeAdd.ConsigneeName))
                    return new Response<int>(0, Status.ERROR, "Given Name of Consignee is empty");
                if (isNameAvailableAlready(ConsigneeAdd, "ADD"))
                    return new Response<int>(0, Status.ERROR, "Given Mode of Consignee is already available");

                return new Response<int>(strrep.AddData(new Repository.Consignee
                {
                    IsActive = ConsigneeAdd.IsActive.ToUpper() == "TRUE",
                    ConsigneeId = ConsigneeAdd.ConsigneeId,
                    Consignee1 = ConsigneeAdd.ConsigneeName,
                    //CityId = (int)(ConsigneeAdd.CityId == null ? 0 : ConsigneeAdd.CityId),    
                    CityId = CitId,
                    Address1 = ConsigneeAdd.Address1,
                    Address2 = ConsigneeAdd.Address2,
                    Address3 = ConsigneeAdd.Address3,
                    Zipcode = ConsigneeAdd.Zipcode,
                    Remarks = ConsigneeAdd.Remarks,
                    Consignee_Lookup = ConsigneeAdd.Lookup
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Response<bool> UpdateConsignee(Domain.Consignee ConsigneeUpd)
        {

            int? CitId = 0;

            if (ConsigneeUpd.CityId == 0)
            {
                CitId = null;
            }
            else
            {
                CitId = ConsigneeUpd.CityId;
            }
            if (string.IsNullOrEmpty(ConsigneeUpd.ConsigneeName))
                return new Response<bool>(false, Status.ERROR, "Given Name of Consignee is empty");
            if (isNameAvailableAlready(ConsigneeUpd, "UPDATE"))
                return new Response<bool>(false, Status.ERROR, "Given name of Consignee is already available");

            return new Response<bool>(strrep.UpdateData(new Repository.Consignee
            {
                IsActive = ConsigneeUpd.IsActive.ToUpper() == "TRUE",
                ConsigneeId = ConsigneeUpd.ConsigneeId,
                Consignee1 = ConsigneeUpd.ConsigneeName,
                Address1 = ConsigneeUpd.Address1,
                Address2 = ConsigneeUpd.Address2,
                Address3 = ConsigneeUpd.Address3,
                Zipcode = ConsigneeUpd.Zipcode,
                CityId = CitId,
                Remarks = ConsigneeUpd.Remarks,
                Consignee_Lookup = ConsigneeUpd.Lookup
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteConsignee(int ConsigneeId)
        {
            return new Response<bool>(strrep.DeleteData(ConsigneeId), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.Consignee st, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetConsignee().Value.Where(c => c.ConsigneeName.ToUpper() == st.ConsigneeName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetConsignee().Value.Where(c => c.ConsigneeName.ToUpper() == st.ConsigneeName.ToUpper() && c.ConsigneeId != st.ConsigneeId).ToList().Count > 0);
            }
            return false;

        }
    }
}
