using AxonApparel.Common;
using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public class UnitConversionBusiness : IUnitConversionBusiness
    {
        private IUnitConversionRepository strrep = new UnitConversionRepository();


        public Response<IEnumerable<Domain.UnitConversion>> GetUC()
        {
            try
            {
                var strlist = strrep.GetDataListAll();
                return new Response<IEnumerable<Domain.UnitConversion>>(strlist.Select(m => new Domain.UnitConversion
                {
                    IsActive = m.IsActive ? "TRUE" : "FALSE",
                    Id = m.UConvID,
                    FromUomId = m.FromUomID,
                    ToUomId = m.ToUomID,
                    Mode = (m.ConvMode == null ? "" : m.ConvMode),//m.ConvMode,
                    Conversion =(m.Conversion == null ? "" : m.Conversion), //m.Conversion,
                    FuomTuom = m.Conversion,


                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.UnitConversion>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Response<Domain.UnitConversion> GetId(int Id)
        {
            try
            {
                var str = strrep.GetDataById(Id);
                return new Response<Domain.UnitConversion>(new Domain.UnitConversion
                {
             
                    IsActive = str.IsActive ? "TRUE" : "FALSE",
                    Id = str.UConvID,
                    FromUomId = str.FromUomID,
                    ToUomId = str.ToUomID,
                    Mode = (str.ConvMode == null ? "" : str.ConvMode),//m.ConvMode,
                    Conversion = (str.Conversion == null ? "" : str.Conversion), //m.Conversion,
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.UnitConversion>(null, Status.ERROR, "OOPS error occured... Please try again later");
            }
        }

        public Response<int> CreateUC(Domain.UnitConversion UCAdd)
        {
            try
            {
               
                if (isNameAvailableAlready(UCAdd, "ADD"))
                    return new Response<int>(-1, Status.ERROR, "Given Uom is already available");

                return new Response<int>(strrep.AddData(new Repository.Unit_Conversion
                {
                    IsActive = UCAdd.IsActive.ToUpper() == "TRUE",
                    UConvID = UCAdd.Id,
                    FromUomID = UCAdd.FromUomId,
                    ToUomID = UCAdd.ToUomId,
                    //FromUom=UCAdd.FromUom,
                    //ToUom=UCAdd.ToUom,
                    ConvMode = UCAdd.Mode,
                    Conversion=UCAdd.Conversion
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Response<bool> UpdateUC(Domain.UnitConversion UCUpd)
        {
            //if (string.IsNullOrEmpty(UCUpd.Conversion))
            //    return new Response<bool>(false, Status.ERROR, "Given Uom is empty");
            if (isNameAvailableAlready(UCUpd, "UPDATE"))
                return new Response<bool>(false, Status.EXISTS, "Given Uom is already available");

            return new Response<bool>(strrep.UpdateData(new Repository.Unit_Conversion
            {
                IsActive = UCUpd.IsActive.ToUpper() == "TRUE",
                UConvID = UCUpd.Id,
                FromUomID = UCUpd.FromUomId,
                ToUomID = UCUpd.ToUomId,
                //FromUom = UCUpd.FromUom,
                //ToUom = UCUpd.ToUom,
                   ConvMode = UCUpd.Mode,
                   Conversion=UCUpd.Conversion
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteUC(int Id)
        {

            return new Response<bool>(strrep.DeleteData(Id), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.UnitConversion st, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetUC().Value.Where(c => c.FromUomId == st.FromUomId && c.ToUomId==st.ToUomId).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetUC().Value.Where(c => c.FromUomId == st.FromUomId && c.ToUomId == st.ToUomId && c.Id != st.Id).ToList().Count > 0);
            }
            return false;

        }

    }
}
