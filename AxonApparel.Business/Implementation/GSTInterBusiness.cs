using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;
using AxonApparel.Common;
using AxonApparel.Repository;

namespace AxonApparel.Business
{
    public class GSTInterBusiness : IGSTInterBusiness
    {
        private IGSTRepository gst = new GSTRepository();

        public Response<IEnumerable<GSTModel>> GetGSTList()
        {
            try
            {
                var GarmUomList = gst.GetDataListAll();
                return new Response<IEnumerable<Domain.GSTModel>>(GarmUomList.Select(m => new Domain.GSTModel
                {
                    GSTtaxcode = m.GSTtaxcode,
                    GSTtaxdesc = m.GSTtaxdesc,
                    CGSTper = m.CGSTper,
                    SGSTper = m.SGSTper,
                    IGSTper = m.IGSTper,
                    Addtaxper = m.Addtaxper,
                    Ttype = m.Ttype,
                    sortorder = m.sortorder,
                    enteredby = m.enteredby,
                    enteredDate = m.enteredDate,
                    modifiedby = m.modifiedby,
                    modifiedDate = m.modifiedDate,
                    rstatus=m.rstatus,
                    Type = m.Type,
                    id=m.id

                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.GSTModel>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<GSTModel> GetGSTModel(int GSTId)
        {
            try
            {
                var Garm = gst.GetDataById(GSTId);
                return new Response<Domain.GSTModel>(new Domain.GSTModel
                {
                    GSTtaxcode = Garm.GSTtaxcode,
                    GSTtaxdesc = Garm.GSTtaxdesc,
                    CGSTper = Garm.CGSTper,
                    SGSTper = Garm.SGSTper,
                    IGSTper = Garm.IGSTper,
                    Addtaxper = Garm.Addtaxper,
                    Ttype = Garm.Ttype,
                    sortorder = Garm.sortorder,
                    enteredby = Garm.enteredby,
                    enteredDate = Garm.enteredDate,
                    modifiedby = Garm.modifiedby,
                    modifiedDate = Garm.modifiedDate,
                    Type = Garm.Type,
                    id=Garm.id,
                    rstatus=Garm.rstatus
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<GSTModel>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreateGSTModel(GSTModel GSTAdd)
        {
            try
            {
                if (string.IsNullOrEmpty(GSTAdd.GSTtaxcode)) return new Response<int>(0, Status.ERROR, "Given GUom is empty");
                //if (isNameAvailableAlready(GSTAdd, "ADD")) return new Response<int>(-1, Status.ERROR, "Given GUom is already available");
                if (string.IsNullOrEmpty(GSTAdd.Ttype))
                {
                    GSTAdd.Ttype = "";
                }
                if (string.IsNullOrEmpty(GSTAdd.modifiedby))
                {
                    GSTAdd.modifiedby = "";
                }

                if (string.IsNullOrEmpty(GSTAdd.Type))
                {
                    GSTAdd.Type = "";
                }
                GSTAdd.enteredDate = DateTime.Now;
                GSTAdd.modifiedDate = DateTime.Now;
                
                return new Response<int>(gst.AddData(new Repository.Acc_Gsttaxmaster
                {
                    GSTtaxcode = GSTAdd.GSTtaxcode,
                    GSTtaxdesc = GSTAdd.GSTtaxdesc,
                    CGSTper = GSTAdd.CGSTper,
                    SGSTper = GSTAdd.SGSTper,
                    IGSTper = GSTAdd.IGSTper,
                    Addtaxper = 0,
                    Ttype = GSTAdd.Ttype,
                    sortorder = 0,
                    enteredby = GSTAdd.enteredby,
                    enteredDate = GSTAdd.enteredDate,
                    modifiedby = GSTAdd.modifiedby,
                    modifiedDate = GSTAdd.modifiedDate,
                    Type = GSTAdd.Type,
                    id = GSTAdd.id,
                    rstatus = GSTAdd.rstatus

                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception ex)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateGSTModel(GSTModel GSTUpd)
        {
            if (string.IsNullOrEmpty(GSTUpd.GSTtaxcode)) return new Response<bool>(false, Status.ERROR, "Given GUom is empty");
         //   if (isNameAvailableAlready(GSTUpd, "UPDATE")) return new Response<bool>(false, Status.EXISTS, "Given GUom is already available");
            if (string.IsNullOrEmpty(GSTUpd.Ttype))
            {
                GSTUpd.Ttype = "";
            }
            if (string.IsNullOrEmpty(GSTUpd.enteredby))
            {
                GSTUpd.enteredby = "";
            }
            GSTUpd.enteredDate = DateTime.Now;
            GSTUpd.modifiedDate = DateTime.Now;
            return new Response<bool>(gst.UpdateData(new Repository.Acc_Gsttaxmaster
            {
                GSTtaxcode = GSTUpd.GSTtaxcode,
                GSTtaxdesc = GSTUpd.GSTtaxdesc,
                CGSTper = GSTUpd.CGSTper,
                SGSTper = GSTUpd.SGSTper,
                IGSTper = GSTUpd.IGSTper,
                Addtaxper = GSTUpd.Addtaxper,
                Ttype = GSTUpd.Ttype,
                sortorder = GSTUpd.sortorder,
                enteredby = GSTUpd.enteredby,
                enteredDate = GSTUpd.enteredDate,
                modifiedby = GSTUpd.modifiedby,
                modifiedDate = GSTUpd.modifiedDate,
                Type = GSTUpd.Type,
                rstatus=GSTUpd.rstatus,
                id = GSTUpd.id
            }), Status.SUCCESS, "Added Successfully");
        }

        public Response<bool> DeleteGSTModel(int GSTID)
        {
            return new Response<bool>(gst.DeleteData(GSTID), Status.SUCCESS, "Deleted Successfully");
        }
        public Response<IList<GSTModel>> GetGSTRefDetails(int GSTID)
        {
            try
            {
                var ProductEWO = gst.GetRepAccountCheckItemDetails(GSTID);

                return new Response<IList<GSTModel>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<GSTModel>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        private bool isNameAvailableAlready(GSTModel Garm, string Gsttaxcode)
        {
            if (Gsttaxcode.ToUpper() == "ADD")
            {
                return (GetGSTList().Value.Where(c => c.GSTtaxcode.ToUpper() == Garm.GSTtaxcode.ToUpper()).ToList().Count > 0);
            }
            else if (Gsttaxcode.ToUpper() == "UPDATE")
            {
                return (GetGSTList().Value.Where(c => c.GSTtaxcode.ToUpper() == Garm.GSTtaxcode.ToUpper() && c.id != Garm.id).ToList().Count > 0);
            }
            return false;
        }

      
    }
}
