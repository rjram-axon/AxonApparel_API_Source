using AxonApparel.Common;
using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public class ColorMasterBusiness:IColorMasterBusiness
    {
        private IColorMasterRepository strrep = new ColorMasterRepository();


        //public Common.Response<IQueryable<Domain.ColorMaster>> GetColorMaster()
        //{
        //    try
        //    {
        //        var strlist = strrep.GetDataList();
        //        return new Response<IQueryable<Domain.ColorMaster>>(strlist.Select(m => new Domain.ColorMaster
        //        {
        //            IsActive = m.IsActive ? "TRUE" : "FALSE",
        //            ColorId = m.Colorid,
        //            ColorGroupId = (int)(m.ColorGroupID == null ? 0 : m.ColorGroup.ColorGroupID),//(int)m.ColorGroupID,
        //            ColorGroupName = (m.ColorGroup == null ? "" : m.ColorGroup.ColorGroup1),//m.ColorGroup.ColorGroup1,
        //            ColorName = (m.Colorname == null ? "" : m.Colorname),//m.Colorname,
        //            ColorCode = (m.ColorCode == null ? "" : m.ColorCode),//m.ColorCode,
        //            ColorNo = (m.ColorNo == null ? "" : m.ColorNo),//m.ColorNo,
        //            Lookup = (m.Lookup == null ? "" : m.Lookup),//m.Lookup,
        //            Pantone = (m.Pantone == null ? "" : m.Pantone),//m.Pantone

        //        }), Status.SUCCESS, "Fetched Successfully");
        //    }
        //    catch (Exception ex)
        //    {
        //        return new Response<IQueryable<Domain.ColorMaster>>(null, Status.ERROR, "OOPS error occured. Please try again later");
        //    }
        //}

        public Common.Response<IEnumerable<Domain.ColorMaster>> GetColorMaster()
        {
            try
            {
                var ProductWO = strrep.GetDataColorList();

                return new Response<IEnumerable<Domain.ColorMaster>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.ColorMaster>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<Domain.ColorMaster> GetColorMasterId(int ColorMasterId)
        {
            try
            {
                var str = strrep.GetDataById(ColorMasterId);
                return new Response<Domain.ColorMaster>(new Domain.ColorMaster
                {
                    //IsActive = str.IsActive ? "TRUE" : "FALSE",
                    //ColorId = str.Colorid,
                    //ColorName=str.Colorname,
                    //Lookup=str.Lookup,
                    //Pantone=str.Pantone,
                    //ColorNo=str.ColorNo,
                    //ColorCode=str.ColorCode,
                    //ColorGroupId=(int)str.ColorGroupID
                    IsActive = str.IsActive ? "TRUE" : "FALSE",
                    ColorId = str.Colorid,
                    //ColorGroupId = (int)(str.ColorGroupID == null ? 0 : str.ColorGroup.ColorGroupID),//(int)m.ColorGroupID,
                    //ColorGroupName = "TEST",//(str.ColorGroup == null ? "" : str.ColorGroup.ColorGroup1),//m.ColorGroup.ColorGroup1,
                    ColorName = (str.Colorname == null ? "" : str.Colorname),//m.Colorname,
                    ColorCode = (str.ColorCode == null ? "" : str.ColorCode),//m.ColorCode,
                    ColorNo = (str.ColorNo == null ? "" : str.ColorNo),//m.ColorNo,
                    Lookup = (str.Lookup == null ? "" : str.Lookup),//m.Lookup,
                    Pantone = (str.Pantone == null ? "" : str.Pantone),//m.Pantone
                    
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.ColorMaster>(null, Status.ERROR, "OOPS error occured... Please try again later");
            }
        }

        public Common.Response<int> CreateColorMaster(Domain.ColorMaster ColorMasterAdd)
        {
            try
            {

                int? CrgId = 0;

                if (ColorMasterAdd.ColorGroupId == 0)
                {
                    CrgId = null;
                }
                else
                {
                    CrgId = ColorMasterAdd.ColorGroupId;
                }

                if (string.IsNullOrEmpty(ColorMasterAdd.ColorName))
                    return new Response<int>(0, Status.ERROR, "Given Color is empty");
                if (isNameAvailableAlready(ColorMasterAdd, "ADD"))
                    return new Response<int>(-1, Status.ERROR, "Given Color is already available");

                return new Response<int>(strrep.AddData(new Repository.Color
                {
                    IsActive = ColorMasterAdd.IsActive.ToUpper() == "TRUE",
                    ColorGroupID = CrgId,//ColorMasterAdd.ColorGroupId,
                    ColorCode = ColorMasterAdd.ColorCode,
                    ColorNo = ColorMasterAdd.ColorNo,
                    Colorname = ColorMasterAdd.ColorName,
                    Color1 = ColorMasterAdd.ColorName,
                    Lookup = ColorMasterAdd.Lookup,
                    Pantone = ColorMasterAdd.Pantone,
                    Colorid=ColorMasterAdd.ColorId
                   }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Common.Response<bool> UpdateColorMaster(Domain.ColorMaster ColorMasterUpd)
        {

            int? CrgId = 0;

            if (ColorMasterUpd.ColorGroupId == 0)
            {
                CrgId = null;
            }
            else
            {
                CrgId = ColorMasterUpd.ColorGroupId;
            }
            if (string.IsNullOrEmpty(ColorMasterUpd.ColorName))
                return new Response<bool>(false, Status.ERROR, "Given Color is empty");
            if (isNameAvailableAlready(ColorMasterUpd, "UPDATE"))
                return new Response<bool>(false, Status.EXISTS, "Given Color is already available");

            return new Response<bool>(strrep.UpdateData(new Repository.Color
            {
                IsActive = ColorMasterUpd.IsActive.ToUpper() == "TRUE",
                ColorGroupID =CrgId,// ColorMasterUpd.ColorGroupId,
                ColorCode = ColorMasterUpd.ColorCode,
                ColorNo = ColorMasterUpd.ColorNo,
                Colorname = ColorMasterUpd.ColorName,
                Color1 = ColorMasterUpd.ColorName,
                Lookup = ColorMasterUpd.Lookup,
                Pantone = ColorMasterUpd.Pantone,
                Colorid = ColorMasterUpd.ColorId
                  
                }), Status.SUCCESS, "Updated Successfully");
        }

        public Common.Response<bool> DeleteColorMaster(int ColorMasterId)
        {
            return new Response<bool>(strrep.DeleteData(ColorMasterId), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.ColorMaster st, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetColorMaster().Value.Where(c => c.ColorName.ToUpper() == st.ColorName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetColorMaster().Value.Where(c => c.ColorName.ToUpper() == st.ColorName.ToUpper() && c.ColorId != st.ColorId).ToList().Count > 0);
            }
            return false;

        }



        public Response<IList<Domain.ColorMaster>> GetColorCheckItemDetails(int ColorId)
        {
            try
            {
                var ProductEWO = strrep.GetRepColorCheckItemDetails(ColorId);

                return new Response<IList<Domain.ColorMaster>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.ColorMaster>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
