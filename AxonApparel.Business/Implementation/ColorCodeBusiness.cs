using AxonApparel.Common;
using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public class ColorCodeBusiness:IColorCodeBusiness
    {
        private IColorCodeRepository ccrep = new ColorCodeRepository();

        public Common.Response<IQueryable<Domain.ColorCode>> GetColorCode()
        {
            try
            {
                var strlist = ccrep.GetDataList();
                return new Response<IQueryable<Domain.ColorCode>>(strlist.Select(m => new Domain.ColorCode
                {
                    IsActive = m.IsActive ? "TRUE" : "FALSE",
                    ColorCodeId=m.ColorCodeId,                    
                    SupplierID=(int)m.SupplierId,
                    Supplier=m.Supplier.Supplier1,
                    ColorCodenam=m.ColorCode1,
                    ColorID=(int)m.ColorId,
                    Color=m.Color.Colorname,
                    ColorShade=m.ColorShade
                    
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<Domain.ColorCode>>(null, Status.ERROR, "OOPS error occured. Please try again later");
            }
        }

        public Common.Response<Domain.ColorCode> GetId(int Id)
        {
            try
            {
                var str = ccrep.GetDataById(Id);
                return new Response<Domain.ColorCode>(new Domain.ColorCode
                {
                    IsActive = str.IsActive ? "TRUE" : "FALSE",
                    ColorCodeId = str.ColorCodeId,
                    ColorCodenam = str.ColorCode1,
                    SupplierID = (int)str.SupplierId,
                    Supplier = str.Supplier.Supplier1,
                    ColorID = (int)str.ColorId,
                    Color = str.Color.Colorname,
                    ColorShade = str.ColorShade
                    
                    
                   
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.ColorCode>(null, Status.ERROR, "OOPS error occured... Please try again later");
            }
        }

        public Common.Response<int> CreateColorCode(Domain.ColorCode ColorCodeAdd)
        {
            try
            {
                if (string.IsNullOrEmpty(ColorCodeAdd.ColorCodenam))
                    return new Response<int>(0, Status.ERROR, "Given ColorCode is empty");
                if (isNameAvailableAlready(ColorCodeAdd, "ADD"))
                    return new Response<int>(0, Status.ERROR, "Given ColorCode is already available");

                return new Response<int>(ccrep.AddData(new Repository.ColorCode
                {
                    IsActive = ColorCodeAdd.IsActive.ToUpper() == "TRUE",
                    ColorCodeId=ColorCodeAdd.ColorCodeId,
                    ColorCode1 = ColorCodeAdd.ColorCodenam,
                    ColorId=ColorCodeAdd.ColorID,
                    SupplierId=ColorCodeAdd.SupplierID,
                    ColorShade=ColorCodeAdd.ColorShade
                    
                    }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Common.Response<bool> UpdateColorCode(Domain.ColorCode ColorCodeUpd)
        {
            if (string.IsNullOrEmpty(ColorCodeUpd.ColorCodenam))
                return new Response<bool>(false, Status.ERROR, "Given ColorCode is empty");
            if (isNameAvailableAlready(ColorCodeUpd, "UPDATE"))
                return new Response<bool>(false, Status.ERROR, "Given ColorCode is already available");

            return new Response<bool>(ccrep.UpdateData(new Repository.ColorCode
            {
                IsActive = ColorCodeUpd.IsActive.ToUpper() == "TRUE",
                ColorCodeId=ColorCodeUpd.ColorCodeId,
                ColorCode1 = ColorCodeUpd.ColorCodenam,
                ColorShade=ColorCodeUpd.ColorShade,
                ColorId=ColorCodeUpd.ColorID,
                SupplierId=ColorCodeUpd.SupplierID
                }), Status.SUCCESS, "Updated Successfully");
        }

        public Common.Response<bool> DeleteColorCode(int Id)
        {
            return new Response<bool>(ccrep.DeleteData(Id), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.ColorCode st, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetColorCode().Value.Where(c => c.ColorCodenam.ToUpper() == st.ColorCodenam.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetColorCode().Value.Where(c => c.ColorCodenam.ToUpper() == st.ColorCodenam.ToUpper() && c.ColorCodeId != st.ColorCodeId).ToList().Count > 0);
            }
            return false;

        }
      
    }
}
