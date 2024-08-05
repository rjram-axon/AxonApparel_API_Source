using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AxonApparel.Common;
using AxonApparel.Repository;

namespace AxonApparel.Business
{
    public class ColorBusiness:IColorBusiness
    {
        private IColorRepository crep = new ColorRepository();


        public Response<IQueryable<Domain.Color>> GetColor()
        {
            try
            {
                var strlist = crep.GetDataList();
                return new Response<IQueryable<Domain.Color>>(strlist.Select(m => new Domain.Color
                {
                    IsActive = (bool)m.IsActive ? "TRUE" : "FALSE",
                    ColorId = (int)(m.Colorid == null ? 0 : m.Colorid),
                    ColorName = (m.Color1 == null ? "" : m.Color1),//m.Color1,
                    ColorGroupId = (int)(m.ColorGroupID == null ? 0 : m.ColorGroupID),
                    ColorCode = (m.ColorCode == null ? "" : m.ColorCode),//m.ColorCode,
                    ColorNo = (m.ColorNo == null ? "" : m.ColorNo),//m.ColorNo,
                    Pantone=(m.Pantone == null ? "" : m.Pantone),//m.Pantone,
                    ColorOth=(m.ColorOth == null ? "" : m.ColorOth),//m.ColorOth,
                    Lookup=(m.Lookup == null ? "" : m.Lookup),//m.Lookup,
       
                    
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.Color>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Response<Domain.Color> GetColorId(int ColorId)
        {
            try
            {
                var str = crep.GetDataById(ColorId);
                return new Response<Domain.Color>(new Domain.Color
                {
                    //ColorName = str.Color1,
                    //ColorGroupId = str.Colorid,
                    //IsActive = (bool)str.IsActive ? "TRUE" : "FALSE",
                    //ColorId=str.Colorid,
                    //ColorCode=str.ColorCode,
                    //ColorNo = str.ColorNo,
                    //Pantone = str.Pantone,
                    //ColorOth=str.ColorOth,
                    //Lookup=str.Lookup
                    IsActive = (bool)str.IsActive ? "TRUE" : "FALSE",
                    ColorId = str.Colorid,
                    ColorName = (str.Color1 == null ? "" : str.Color1),//m.Color1,
                    ColorGroupId = (int)str.ColorGroupID,
                    ColorCode = (str.ColorCode == null ? "" : str.ColorCode),//m.ColorCode,
                    ColorNo = (str.ColorNo == null ? "" : str.ColorNo),//m.ColorNo,
                    Pantone = (str.Pantone == null ? "" : str.Pantone),//m.Pantone,
                    ColorOth = (str.ColorOth == null ? "" : str.ColorOth),//m.ColorOth,
                    Lookup = (str.Lookup == null ? "" : str.Lookup),//m.Lookup,
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.Color>(null, Status.ERROR, "OOPS error occured... Please try again later");
            }
        }

        public Response<int> CreateColor(Domain.Color ColorAdd)
        {
            try
            {

                int? CrgId = 0;

                if (ColorAdd.ColorGroupId == 0)
                {
                    CrgId = null;
                }
                else
                {
                    CrgId = ColorAdd.ColorGroupId;
                }

                if (string.IsNullOrEmpty(ColorAdd.ColorName))
                    return new Response<int>(0, Status.ERROR, "Given Name of Color is empty");
                if (isNameAvailableAlready(ColorAdd, "ADD"))
                    return new Response<int>(0, Status.ERROR, "Given Mode of Color is already available");

                return new Response<int>(crep.AddData(new Repository.Color
                {
                    Colorid = ColorAdd.ColorId,
                    Color1 = ColorAdd.ColorName,
                    Colorname = ColorAdd.ColorName,
                    IsActive = ColorAdd.IsActive.ToUpper() == "TRUE",
                    ColorGroupID=CrgId,//ColorAdd.ColorGroupId,
                    ColorCode=ColorAdd.ColorCode,
                    ColorNo=ColorAdd.ColorNo,
                    Pantone=ColorAdd.Pantone,
                    ColorOth=ColorAdd.ColorOth,
                    Lookup=ColorAdd.Lookup
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Response<bool> UpdateColor(Domain.Color ColorUpd)
        {
            int? CrgId = 0;

            if (ColorUpd.ColorGroupId == 0)
            {
                CrgId = null;
            }
            else
            {
                CrgId = ColorUpd.ColorGroupId;
            }

            if (string.IsNullOrEmpty(ColorUpd.ColorName))
                return new Response<bool>(false, Status.ERROR, "Given ColorName  is empty");
            if (isNameAvailableAlready(ColorUpd, "UPDATE"))
                return new Response<bool>(false, Status.ERROR, "Given name of Color is already available");

            return new Response<bool>(crep.UpdateData(new Repository.Color
            {
                Color1 = ColorUpd.ColorName,
                Colorname = ColorUpd.ColorName,
                ColorGroupID = CrgId,//ColorUpd.ColorGroupId,
                IsActive = ColorUpd.IsActive.ToUpper() == "TRUE",
                Colorid = ColorUpd.ColorId,
                ColorCode = ColorUpd.ColorCode,
                ColorNo = ColorUpd.ColorNo,
                Pantone = ColorUpd.Pantone,
                ColorOth = ColorUpd.ColorOth,
                Lookup = ColorUpd.Lookup
                
            }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteColor(int ColorId)
        {
            return new Response<bool>(crep.DeleteData(ColorId), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.Color st, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetColor().Value.Where(c => c.ColorName.ToUpper() == st.ColorName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetColor().Value.Where(c => c.ColorName.ToUpper() == st.ColorName.ToUpper() && c.ColorId != st.ColorId).ToList().Count > 0);
            }
            return false;

        }


        public Response<IList<Domain.Color>> GetColorCheckItemDetails(int ColorId)
        {
            try
            {
                var ProductEWO = crep.GetRepColorCheckItemDetails(ColorId);

                return new Response<IList<Domain.Color>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Color>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
