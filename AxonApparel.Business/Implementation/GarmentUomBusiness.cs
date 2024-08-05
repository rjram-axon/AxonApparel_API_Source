using AxonApparel.Common;
using AxonApparel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public class GarmentUomBusiness : IGarmentUomBusiness
    {
        private GarmentUomRepository Garmrepo = new GarmentUomRepository();

        public Response<IEnumerable<Domain.Garment_Uom>> GetGarmentUom()
        {
            try
            {
                var GarmUomList = Garmrepo.GetDataListAll();
                return new Response<IEnumerable<Domain.Garment_Uom>>(GarmUomList.Select(m => new Domain.Garment_Uom
                    {
                        IsActive = m.IsActive ? "TRUE" : "FALSE",
                        GUomId = (int)m.GUomId,
                        GUom = m.GUom,
                        GUom_Lookup = m.GUom_Lookup,
                        To_BUom = (int)m.To_BUom,
                    }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Garment_Uom>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IEnumerable<Domain.Garment_Uom>> GetBaseUom()
        {
            try
            {
                var GarmUomList = Garmrepo.GetDataListBase();
                return new Response<IEnumerable<Domain.Garment_Uom>>(GarmUomList.Select(m => new Domain.Garment_Uom
                {
                    IsActive = m.IsActive ? "TRUE" : "FALSE",
                    GUomId = (int)m.GUomId,
                    GUom = m.GUom,
                    GUom_Lookup = m.GUom_Lookup,
                    To_BUom = (int)m.To_BUom,
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Garment_Uom>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<Domain.Garment_Uom> GetGarmentUomId(int GarmentUomId)
        {
            try
            {
                var Garm = Garmrepo.GetDataById(GarmentUomId);
                return new Response<Domain.Garment_Uom>(new Domain.Garment_Uom
                    {
                        IsActive = Garm.IsActive ? "TRUE" : "FALSE",
                        GUom = Garm.GUom,
                        GUom_Lookup = Garm.GUom_Lookup,
                        GUomId = (int)Garm.GUomId,
                        To_BUom = (int)Garm.To_BUom,
                    }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<Domain.Garment_Uom>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreateGarmentUom(Domain.Garment_Uom GarmentUomAdd)
        {
            try
            {
                if (string.IsNullOrEmpty(GarmentUomAdd.GUom)) return new Response<int>(0, Status.ERROR, "Given GUom is empty");
                if (isNameAvailableAlready(GarmentUomAdd, "ADD")) return new Response<int>(-1, Status.ERROR, "Given GUom is already available");

                return new Response<int>(Garmrepo.AddData(new Repository.Garment_Uom
                    {
                        GUom = GarmentUomAdd.GUom,
                        GUomId = GarmentUomAdd.GUomId,
                        GUom_Lookup = GarmentUomAdd.GUom_Lookup,
                        To_BUom = (byte)GarmentUomAdd.To_BUom, // byte or int...doubt
                        IsActive = GarmentUomAdd.IsActive.ToUpper() == "TRUE",
                    }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception ex)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateGarmentUom(Domain.Garment_Uom GarmentUomUpd)
        {
            if (string.IsNullOrEmpty(GarmentUomUpd.GUom)) return new Response<bool>(false, Status.ERROR, "Given GUom is empty");
            if (isNameAvailableAlready(GarmentUomUpd, "UPDATE")) return new Response<bool>(false, Status.EXISTS, "Given GUom is already available");

            return new Response<bool>(Garmrepo.UpdateData(new Repository.Garment_Uom
                {
                    GUom = GarmentUomUpd.GUom,
                    GUomId = GarmentUomUpd.GUomId,
                    GUom_Lookup = GarmentUomUpd.GUom_Lookup,
                    To_BUom = (byte)GarmentUomUpd.To_BUom, // byte or int...doubt
                    IsActive = GarmentUomUpd.IsActive.ToUpper() == "TRUE",
                }), Status.SUCCESS, "Added Successfully");
        }

        public Response<bool> DeleteGarmentUom(int GarmentUomId)
        {
            return new Response<bool>(Garmrepo.DeleteData(GarmentUomId), Status.SUCCESS, "Deleted Successfully");
        }

        private bool isNameAvailableAlready(Domain.Garment_Uom Garm, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetGarmentUom().Value.Where(c => c.GUom.ToUpper() == Garm.GUom.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetGarmentUom().Value.Where(c => c.GUom.ToUpper() == Garm.GUom.ToUpper() && c.GUomId != Garm.GUomId).ToList().Count > 0);
            }
            return false;
        }


        public Response<IList<Domain.Garment_Uom>> GetGuomCheckItemDetails(int GUomId)
        {
            try
            {
                var ProductEWO = Garmrepo.GetRepGuomCheckItemDetails(GUomId);

                return new Response<IList<Domain.Garment_Uom>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Garment_Uom>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }

}
