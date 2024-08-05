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
    public class ItemBusiness : IItemBusiness
    {
        private IItemRepository itemRepo = new ItemRepository();

        //public Response<IQueryable<Domain.Item>> GetItem()
        //{
        //    try
        //    {
        //        var couList = itemRepo.GetDataList();
        //        return new Response<IQueryable<Domain.Item>>(couList.Select(m => new Domain.Item
        //        {
        //            IsActive = m.IsActive ? "TRUE" : "FALSE",
        //            Itemid = m.ItemId,
        //            ItemGroupId = (int)(m.ItemGroupId == null ? 0 : m.ItemGroupId),
        //            ItemGroupName = (m.ItemGroupId == null ? "" : m.ItemGroup.ItemGroup1),
        //            ItemName = (m.Item1 == null ? "" : m.Item1),
        //            Description = (m.Descript == null ? "" : m.Descript),
        //            ItemTypeName = (m.ItemType == null ? "" : m.ItemType),


        //            //BasicUnit = (m.Unit_of_measurement.UomId),
        //            //SecUnit = (int)m.Unit_of_measurement.UomId,
        //            //PurUnit = (int)m.Unit_of_measurement.UomId,

        //            BasicUnit = (int)(m.Unit_of_measurement.UomId == null ? 0 : m.Unit_of_measurement.UomId),
        //            SecUnit = (int)(m.Unit_of_measurement.UomId == null ? 0 : m.Unit_of_measurement.UomId),
        //            PurUnit = (int)(m.Unit_of_measurement.UomId == null ? 0 : m.Unit_of_measurement.UomId),
        //            CGST = (int)(m.CGST == null ? 0 : m.CGST),
        //            SGST = (int)(m.SGST == null ? 0 : m.SGST),
        //            IGST = (int)(m.IGST == null ? 0 : m.IGST),
        //            HSNCODE = (m.HSNCODE == null ? "" : m.HSNCODE),//m.HSNCODE ,
        //            itemcat = (m.Item_Cat == null ? "" : m.Item_Cat),//m.Item_Cat,
        //            allowvalue = (decimal)(m.Allow_Value == null ? 0 : m.Allow_Value),//(decimal)m.Allow_Value,
        //            color0th = (m.ColorOth == null ? "" : m.ColorOth),//m.ColorOth,
        //            colornum = (m.ColorNo == null ? "" : m.ColorNo),//m.ColorNo,
        //            convfactor = (decimal)(m.conv_factor == null ? 0 : m.conv_factor), //(decimal)m.conv_factor,
        //            percentage = (m.Percentage == null ? "" : m.Percentage),//m.Percentage,
        //            lookup = (m.lookup == null ? "" : m.lookup),//m.lookup
        //            rate = (decimal)(m.Itemrate == null ? 0 : m.Itemrate)

        //        }), Status.SUCCESS, "Fetched Successfully");
        //    }
        //    catch (Exception ex)
        //    {
        //        return new Response<IQueryable<Domain.Item>>(null, Status.ERROR, "OOPS error occured. Please try again");
        //    }
        //}

        public Common.Response<IEnumerable<Domain.Item>> GetItem()
        {
            try
            {
                var ProductWO = itemRepo.GetItemlistOthersAll();

                return new Response<IEnumerable<Domain.Item>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.Item>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IEnumerable<Domain.Shift>> GetShift()
        {
            try
            {
                var couList = itemRepo.GetshiftList();
                return new Response<IEnumerable<Domain.Shift>>(couList.Select(m => new Domain.Shift
                {
                    IsActive = m.IsActive ? "TRUE" : "FALSE",
                    shiftid = (int)(m.shiftid == null ? 0 : m.shiftid),
                    Shiftname = (string)(m.Shift1 == null ? "" : m.Shift1)
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Shift>>(null, Status.ERROR, "OOPS error occured. Please try again");
            }
        }

        public Response<IEnumerable<Domain.Item>> GetAccessoryItem()
        {
            try
            {
                var couList = itemRepo.GetAccessoryDataList();
                return new Response<IEnumerable<Domain.Item>>(couList.Select(m => new Domain.Item
                {
                    IsActive = Convert.ToBoolean(m.IsActive) ? "TRUE" : "FALSE",
                    Itemid = m.Itemid,
                    ItemGroupId = (int)(m.ItemGroupId == null ? 0 : m.ItemGroupId),
                    ItemGroupName =m.ItemGroupName,
                    ItemName = m.ItemName,
                    Description = m.Description,
                    ItemTypeName = m.ItemTypeName,

                    //BasicUnit=(int)m.Bas_Unit,
                    BasicUnit = (m.BasicUnit),
                    SecUnit = (int)m.SecUnit,
                    PurUnit = (int)m.PurUnit,
                    CGST = (decimal)(m.CGST == null ? 0 : m.CGST),
                    SGST = (decimal)(m.SGST == null ? 0 : m.SGST),
                    IGST = (decimal)(m.IGST == null ? 0 : m.IGST),
                    HSNCODE = (m.HSNCODE == null ? "" : m.HSNCODE),//m.HSNCODE ,
                    itemcat = (m.itemcat),//m.Item_Cat,
                    allowvalue = (decimal)(m.allowvalue),//(decimal)m.Allow_Value,
                    color0th = (m.color0th),//m.ColorOth,
                    colornum = (m.colornum),//m.ColorNo,
                    convfactor = (decimal)(m.convfactor), //(decimal)m.conv_factor,
                    percentage = (m.percentage),//m.Percentage,
                    lookup = (m.lookup == null ? "" : m.lookup),//m.lookup
                    rate = (decimal)(m.rate),
                    GSTtaxcode = (m.GSTtaxcode),
                    IGSTtaxcode = (m.IGSTtaxcode),
                    MinQty = (decimal)(m.MinQty == null ? 0 : m.MinQty),
                    MaxQty = (decimal)(m.MaxQty == null ? 0 : m.MaxQty),

                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Item>>(null, Status.ERROR, "OOPS error occured. Please try again");
            }

        }
        public Response<IEnumerable<Domain.Item>> GetGarmentItem()
        {
            try
            {
                var couList = itemRepo.GetGarmentDataList();
                return new Response<IEnumerable<Domain.Item>>(couList.Select(m => new Domain.Item
                {

                    IsActive = Convert.ToBoolean(m.IsActive) ? "TRUE" : "FALSE",
                    Itemid = m.Itemid,
                    ItemGroupId = (int)(m.ItemGroupId == null ? 0 : m.ItemGroupId),
                    ItemGroupName = m.ItemGroupName,
                    ItemName = m.ItemName,
                    Description = m.Description,
                    ItemTypeName = m.ItemTypeName,

                    //BasicUnit=(int)m.Bas_Unit,
                    BasicUnit = (m.BasicUnit),
                    SecUnit = (int)m.SecUnit,
                    PurUnit = (int)m.PurUnit,
                    CGST = (decimal)(m.CGST == null ? 0 : m.CGST),
                    SGST = (decimal)(m.SGST == null ? 0 : m.SGST),
                    IGST = (decimal)(m.IGST == null ? 0 : m.IGST),
                    HSNCODE = (m.HSNCODE == null ? "" : m.HSNCODE),//m.HSNCODE ,
                    itemcat = (m.itemcat),//m.Item_Cat,
                    allowvalue = (decimal)(m.allowvalue),//(decimal)m.Allow_Value,
                    color0th = (m.color0th),//m.ColorOth,
                    colornum = (m.colornum),//m.ColorNo,
                    convfactor = (decimal)(m.convfactor), //(decimal)m.conv_factor,
                    percentage = (m.percentage),//m.Percentage,
                    lookup = (m.lookup == null ? "" : m.lookup),//m.lookup
                    rate = (decimal)(m.rate),
                    GSTtaxcode = (m.GSTtaxcode),
                    IGSTtaxcode = (m.IGSTtaxcode),
                    MinQty = (decimal)(m.MinQty == null ? 0 : m.MinQty),
                    MaxQty = (decimal)(m.MaxQty == null ? 0 : m.MaxQty),

                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Item>>(null, Status.ERROR, "OOPS error occured. Please try again");
            }

        }
        public Response<Domain.Item> GetItemId(int itemId)
        {
            try
            {
                var cou = itemRepo.GetDataById(itemId);
                return new Response<Domain.Item>(new Domain.Item
                {
                    ItemName = cou.Item1,
                    Itemid = cou.ItemId,
                    ItemGroupId = (int)cou.ItemGroupId,
                    Description = cou.Descript,
                    ItemTypeName = cou.ItemType,
                    IsActive = cou.IsActive ? "TRUE" : "FALSE",
                    MajorComp = cou.MajComp,
                    BasicUnit = cou.Bas_Unit,
                    SecUnit = cou.Sec_Unit,
                    PurUnit = cou.Pur_Unit,
                    CGST = (decimal)(cou.CGST == null ? 0 : cou.CGST),
                    SGST = (decimal)(cou.SGST == null ? 0 : cou.SGST),
                    IGST = (decimal)(cou.IGST == null ? 0 : cou.IGST),
                    HSNCODE = (cou.HSNCODE == null ? "" : cou.HSNCODE),//m.HSNCODE ,
                    itemcat = (cou.Item_Cat == null ? "" : cou.Item_Cat),//m.Item_Cat,
                    allowvalue = (decimal)(cou.Allow_Value == null ? 0 : cou.Allow_Value),//(decimal)m.Allow_Value,
                    color0th = (cou.ColorOth == null ? "" : cou.ColorOth),//m.ColorOth,
                    colornum = (cou.ColorNo == null ? "" : cou.ColorNo),//m.ColorNo,
                    convfactor = (decimal)(cou.conv_factor == null ? 0 : cou.conv_factor), //(decimal)m.conv_factor,
                    percentage = (cou.Percentage == null ? "" : cou.Percentage),//m.Percentage,
                    lookup = (cou.lookup == null ? "" : cou.lookup),//m.lookup
                    rate = (decimal)(cou.Itemrate == null ? 0 : cou.Itemrate),
                    GSTtaxcode = (cou.GSTTaxCode == null ? "" : cou.GSTTaxCode),
                    IGSTtaxcode = (cou.IGSTTaxCode == null ? "" : cou.IGSTTaxCode),
                    MinQty = (decimal)(cou.MinQty == null ? 0 : cou.MinQty),
                    MaxQty = (decimal)(cou.MaxQty == null ? 0 : cou.MaxQty),
                }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.Item>(null, Status.ERROR, "OOPS error occured. Please try again");
            }
        }


        public Response<int> CreateItem(Domain.Item ItemAdd)
        {
            try
            {

                int? IGId = 0;
                int? BId = 0;
                int? SeId = 0;
                int? PuId = 0;

                if (ItemAdd.ItemGroupId == 0)
                {
                    IGId = null;
                }
                else
                {
                    IGId = ItemAdd.ItemGroupId;
                }
                if (ItemAdd.BasicUnit == 0)
                {
                    BId = null;
                }
                else
                {
                    BId = ItemAdd.BasicUnit;
                }
                if (ItemAdd.SecUnit == 0)
                {
                    SeId = null;
                }
                else
                {
                    SeId = ItemAdd.SecUnit;
                }
                if (ItemAdd.PurUnit == 0)
                {
                    PuId = null;
                }
                else
                {
                    PuId = ItemAdd.PurUnit;
                }

                if (string.IsNullOrEmpty(ItemAdd.ItemName))
                    return new Response<int>(0, Status.ERROR, "Given Item is empty");
                if (isNameAvailableAlready(ItemAdd, "ADD"))
                    return new Response<int>(-1, Status.ERROR, "Given Item is already available");

                return new Response<int>(itemRepo.AddData(new Repository.Item
                {

                    ItemId = ItemAdd.Itemid,
                    Item1 = ItemAdd.ItemName,
                    ItemGroupId = IGId,//ItemAdd.ItemGroupId,
                    Descript = ItemAdd.Description,
                    ItemType = ItemAdd.ItemTypeName,
                    IsActive = ItemAdd.IsActive.ToUpper() == "TRUE",
                    MajComp = ItemAdd.MajorComp,
                    Bas_Unit = BId,//ItemAdd.BasicUnit,
                    Sec_Unit = SeId,//ItemAdd.SecUnit,
                    Pur_Unit = PuId,//ItemAdd.PurUnit,
                    HSNCODE = ItemAdd.HSNCODE,
                    lookup = ItemAdd.lookup,
                    conv_factor = ItemAdd.convfactor,
                    Allow_Value = ItemAdd.allowvalue,
                    ColorNo = ItemAdd.colornum,
                    ColorOth = ItemAdd.color0th,
                    Item_Cat = ItemAdd.itemcat,
                    Percentage = "0",
                    Itemrate = ItemAdd.rate,
                    CGST = ItemAdd.CGST,
                    IGST = ItemAdd.IGST,
                    SGST = ItemAdd.SGST,
                    GSTTaxCode = ItemAdd.GSTtaxcode,
                    IGSTTaxCode = ItemAdd.IGSTtaxcode,
                    MinQty = ItemAdd.MinQty,
                    MaxQty = ItemAdd.MaxQty,
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Response<bool> UpdateItem(Domain.Item ItemUpd)
        {

            int? IGId = 0;
            int? BId = 0;
            int? SeId = 0;
            int? PuId = 0;

            if (ItemUpd.ItemGroupId == 0)
            {
                IGId = null;
            }
            else
            {
                IGId = ItemUpd.ItemGroupId;
            }
            if (ItemUpd.BasicUnit == 0)
            {
                BId = null;
            }
            else
            {
                BId = ItemUpd.BasicUnit;
            }
            if (ItemUpd.SecUnit == 0)
            {
                SeId = null;
            }
            else
            {
                SeId = ItemUpd.SecUnit;
            }
            if (ItemUpd.PurUnit == 0)
            {
                PuId = null;
            }
            else
            {
                PuId = ItemUpd.PurUnit;
            }

            if (string.IsNullOrEmpty(ItemUpd.ItemName))
                return new Response<bool>(false, Status.ERROR, "Given Item  is empty");
            if (isNameAvailableAlready(ItemUpd, "UPDATE"))
                return new Response<bool>(false, Status.EXISTS, "Given Item is already available");

            return new Response<bool>(itemRepo.UpdateData(new Repository.Item
            {
                Item1 = ItemUpd.ItemName,
                ItemId = ItemUpd.Itemid,
                ItemGroupId = IGId,//ItemUpd.ItemGroupId,
                IsActive = ItemUpd.IsActive.ToUpper() == "TRUE",
                MajComp = ItemUpd.MajorComp,
                Descript = (ItemUpd.Description == null ? string.Empty : ItemUpd.Description),
                ItemType = ItemUpd.ItemTypeName,
                Bas_Unit = (BId == null ? 0 : BId),//ItemUpd.BasicUnit,
                Sec_Unit = (SeId == null ? 0 : SeId),//ItemUpd.SecUnit,
                Pur_Unit = (PuId == null ? 0 : PuId),//ItemUpd.PurUnit,
                HSNCODE = ItemUpd.HSNCODE,
                lookup = ItemUpd.lookup,
                conv_factor = ItemUpd.convfactor,
                Allow_Value = ItemUpd.allowvalue,
                ColorNo = ItemUpd.colornum,
                ColorOth = ItemUpd.color0th,
                Item_Cat = ItemUpd.itemcat,
                Percentage = "0",//ItemUpd.percentage,
                Itemrate = ItemUpd.rate,
                CGST = ItemUpd.CGST,
                IGST = ItemUpd.IGST,
                SGST = ItemUpd.SGST,
                GSTTaxCode = ItemUpd.GSTtaxcode,
                IGSTTaxCode = ItemUpd.IGSTtaxcode,
                MinQty = ItemUpd.MinQty,
                MaxQty = ItemUpd.MaxQty,

            }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> DeleteItem(int ItemId)
        {
            return new Response<bool>(itemRepo.DeleteData(ItemId), Status.SUCCESS, "Deleted Successfully");
        }
        private bool isNameAvailableAlready(Domain.Item st, string mode)
        {
            if (mode.ToUpper() == "ADD")
            {
                return (GetItem().Value.Where(c => c.ItemName.ToUpper() == st.ItemName.ToUpper()).ToList().Count > 0);
            }
            else if (mode.ToUpper() == "UPDATE")
            {
                return (GetItem().Value.Where(c => c.ItemName.ToUpper() == st.ItemName.ToUpper() && c.Itemid != st.Itemid).ToList().Count > 0);
            }
            return false;

        }
        public Common.Response<string> GetFItemId(string[] FIG)
        {
            try
            {
                string strNumSeq = "";
                strNumSeq = itemRepo.GetFItemid(FIG);

                return new Response<string>(strNumSeq, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<string>("", Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IEnumerable<Domain.Item>> GetComponent()
        {
            try
            {
                var couList = itemRepo.GetComponentDataList();
                return new Response<IEnumerable<Domain.Item>>(couList.Select(m => new Domain.Item
                {

                    IsActive = Convert.ToBoolean(m.IsActive) ? "TRUE" : "FALSE",
                    Itemid = m.Itemid,
                    ItemGroupId = (int)(m.ItemGroupId == null ? 0 : m.ItemGroupId),
                    ItemGroupName = m.ItemGroupName,
                    ItemName = m.ItemName,
                    Description = m.Description,
                    ItemTypeName = m.ItemTypeName,

                    //BasicUnit=(int)m.Bas_Unit,
                    BasicUnit = (m.BasicUnit),
                    SecUnit = (int)m.SecUnit,
                    PurUnit = (int)m.PurUnit,
                    CGST = (decimal)(m.CGST == null ? 0 : m.CGST),
                    SGST = (decimal)(m.SGST == null ? 0 : m.SGST),
                    IGST = (decimal)(m.IGST == null ? 0 : m.IGST),
                    HSNCODE = (m.HSNCODE == null ? "" : m.HSNCODE),//m.HSNCODE ,
                    itemcat = (m.itemcat),//m.Item_Cat,
                    allowvalue = (decimal)(m.allowvalue),//(decimal)m.Allow_Value,
                    color0th = (m.color0th),//m.ColorOth,
                    colornum = (m.colornum),//m.ColorNo,
                    convfactor = (decimal)(m.convfactor), //(decimal)m.conv_factor,
                    percentage = (m.percentage),//m.Percentage,
                    lookup = (m.lookup == null ? "" : m.lookup),//m.lookup
                    rate = (decimal)(m.rate),
                    GSTtaxcode = (m.GSTtaxcode),
                    IGSTtaxcode = (m.IGSTtaxcode),
                    MinQty = (decimal)(m.MinQty == null ? 0 : m.MinQty),
                    MaxQty = (decimal)(m.MaxQty == null ? 0 : m.MaxQty),
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Item>>(null, Status.ERROR, "OOPS error occured. Please try again");
            }
        }

        public Response<IEnumerable<Domain.Item>> GetFabric()
        {
            try
            {
                var couList = itemRepo.GetFabricDataList();
                return new Response<IEnumerable<Domain.Item>>(couList.Select(m => new Domain.Item
                {

                    IsActive = Convert.ToBoolean(m.IsActive) ? "TRUE" : "FALSE",
                    Itemid = m.Itemid,
                    ItemGroupId = (int)(m.ItemGroupId == null ? 0 : m.ItemGroupId),
                    ItemGroupName = m.ItemGroupName,
                    ItemName = m.ItemName,
                    Description = m.Description,
                    ItemTypeName = m.ItemTypeName,

                    //BasicUnit=(int)m.Bas_Unit,
                    BasicUnit = (m.BasicUnit),
                    SecUnit = (int)m.SecUnit,
                    PurUnit = (int)m.PurUnit,
                    CGST = (decimal)(m.CGST == null ? 0 : m.CGST),
                    SGST = (decimal)(m.SGST == null ? 0 : m.SGST),
                    IGST = (decimal)(m.IGST == null ? 0 : m.IGST),
                    HSNCODE = (m.HSNCODE == null ? "" : m.HSNCODE),//m.HSNCODE ,
                    itemcat = (m.itemcat),//m.Item_Cat,
                    allowvalue = (decimal)(m.allowvalue),//(decimal)m.Allow_Value,
                    color0th = (m.color0th),//m.ColorOth,
                    colornum = (m.colornum),//m.ColorNo,
                    convfactor = (decimal)(m.convfactor), //(decimal)m.conv_factor,
                    percentage = (m.percentage),//m.Percentage,
                    lookup = (m.lookup == null ? "" : m.lookup),//m.lookup
                    rate = (decimal)(m.rate),
                    GSTtaxcode = (m.GSTtaxcode),
                    IGSTtaxcode = (m.IGSTtaxcode),
                    MinQty = (decimal)(m.MinQty == null ? 0 : m.MinQty),
                    MaxQty = (decimal)(m.MaxQty == null ? 0 : m.MaxQty),
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Item>>(null, Status.ERROR, "OOPS error occured. Please try again");
            }
        }

        public Response<IEnumerable<Domain.Item>> GetYarn()
        {
            try
            {
                var couList = itemRepo.GetYarnDataList();
                return new Response<IEnumerable<Domain.Item>>(couList.Select(m => new Domain.Item
                {

                    IsActive = Convert.ToBoolean(m.IsActive) ? "TRUE" : "FALSE",
                    Itemid = m.Itemid,
                    ItemGroupId = (int)(m.ItemGroupId == null ? 0 : m.ItemGroupId),
                    ItemGroupName = m.ItemGroupName,
                    ItemName = m.ItemName,
                    Description = m.Description,
                    ItemTypeName = m.ItemTypeName,

                    //BasicUnit=(int)m.Bas_Unit,
                    BasicUnit = (m.BasicUnit),
                    SecUnit = (int)m.SecUnit,
                    PurUnit = (int)m.PurUnit,
                    CGST = (decimal)(m.CGST == null ? 0 : m.CGST),
                    SGST = (decimal)(m.SGST == null ? 0 : m.SGST),
                    IGST = (decimal)(m.IGST == null ? 0 : m.IGST),
                    HSNCODE = (m.HSNCODE == null ? "" : m.HSNCODE),//m.HSNCODE ,
                    itemcat = (m.itemcat),//m.Item_Cat,
                    allowvalue = (decimal)(m.allowvalue),//(decimal)m.Allow_Value,
                    color0th = (m.color0th),//m.ColorOth,
                    colornum = (m.colornum),//m.ColorNo,
                    convfactor = (decimal)(m.convfactor), //(decimal)m.conv_factor,
                    percentage = (m.percentage),//m.Percentage,
                    lookup = (m.lookup == null ? "" : m.lookup),//m.lookup
                    rate = (decimal)(m.rate),
                    GSTtaxcode = (m.GSTtaxcode),
                    IGSTtaxcode = (m.IGSTtaxcode),
                    MinQty = (decimal)(m.MinQty == null ? 0 : m.MinQty),
                    MaxQty = (decimal)(m.MaxQty == null ? 0 : m.MaxQty),
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Item>>(null, Status.ERROR, "OOPS error occured. Please try again");
            }
        }
        public Response<IEnumerable<Domain.Item>> GetDropItem()
        {
            try
            {
                var couList = itemRepo.GetDropItemDataList();
                return new Response<IEnumerable<Domain.Item>>(couList.Select(m => new Domain.Item
                {

                    IsActive = Convert.ToBoolean(m.IsActive) ? "TRUE" : "FALSE",
                    Itemid = m.Itemid,
                    ItemGroupId = (int)(m.ItemGroupId == null ? 0 : m.ItemGroupId),
                    ItemGroupName = m.ItemGroupName,
                    ItemName = m.ItemName,
                    Description = m.Description,
                    ItemTypeName = m.ItemTypeName,

                    //BasicUnit=(int)m.Bas_Unit,
                    BasicUnit = (m.BasicUnit),
                    SecUnit = (int)m.SecUnit,
                    PurUnit = (int)m.PurUnit,
                    CGST = (decimal)(m.CGST == null ? 0 : m.CGST),
                    SGST = (decimal)(m.SGST == null ? 0 : m.SGST),
                    IGST = (decimal)(m.IGST == null ? 0 : m.IGST),
                    HSNCODE = (m.HSNCODE == null ? "" : m.HSNCODE),//m.HSNCODE ,
                    itemcat = (m.itemcat),//m.Item_Cat,
                    allowvalue = (decimal)(m.allowvalue),//(decimal)m.Allow_Value,
                    color0th = (m.color0th),//m.ColorOth,
                    colornum = (m.colornum),//m.ColorNo,
                    convfactor = (decimal)(m.convfactor), //(decimal)m.conv_factor,
                    percentage = (m.percentage),//m.Percentage,
                    lookup = (m.lookup == null ? "" : m.lookup),//m.lookup
                    rate = (decimal)(m.rate),
                    GSTtaxcode = (m.GSTtaxcode),
                    IGSTtaxcode = (m.IGSTtaxcode),
                    MinQty = (decimal)(m.MinQty == null ? 0 : m.MinQty),
                    MaxQty = (decimal)(m.MaxQty == null ? 0 : m.MaxQty),
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Item>>(null, Status.ERROR, "OOPS error occured. Please try again");
            }
        }


        public Response<IList<Domain.Item>> GetItemCheckItemDetails(int ItemId)
        {
            try
            {
                var ProductEWO = itemRepo.GetRepItemCheckItemDetails(ItemId);

                return new Response<IList<Domain.Item>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Item>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IEnumerable<Domain.Item>> GetHsn()
        {
            try
            {
                var ProductEWO = itemRepo.GetHsnList();

                return new Response<IEnumerable<Domain.Item>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.Item>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.Item>> GetDataGetGstDetails(string Hsncode)
        {
            try
            {
                var ProductEWO = itemRepo.GetRepGstDetails(Hsncode);

                return new Response<IList<Domain.Item>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.Item>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IEnumerable<Domain.Item>> GetGeneralItem()
        {
            try
            {
                var couList = itemRepo.GetGeneralItemDataList();
                return new Response<IEnumerable<Domain.Item>>(couList.Select(m => new Domain.Item
                {

                    IsActive = Convert.ToBoolean(m.IsActive) ? "TRUE" : "FALSE",
                    Itemid = m.Itemid,
                    ItemGroupId = (int)(m.ItemGroupId == null ? 0 : m.ItemGroupId),
                    ItemGroupName = m.ItemGroupName,
                    ItemName = m.ItemName,
                    Description = m.Description,
                    ItemTypeName = m.ItemTypeName,

                    //BasicUnit=(int)m.Bas_Unit,
                    BasicUnit = (m.BasicUnit),
                    SecUnit = (int)m.SecUnit,
                    PurUnit = (int)m.PurUnit,
                    CGST = (decimal)(m.CGST == null ? 0 : m.CGST),
                    SGST = (decimal)(m.SGST == null ? 0 : m.SGST),
                    IGST = (decimal)(m.IGST == null ? 0 : m.IGST),
                    HSNCODE = (m.HSNCODE == null ? "" : m.HSNCODE),//m.HSNCODE ,
                    itemcat = (m.itemcat),//m.Item_Cat,
                    allowvalue = (decimal)(m.allowvalue),//(decimal)m.Allow_Value,
                    color0th = (m.color0th),//m.ColorOth,
                    colornum = (m.colornum),//m.ColorNo,
                    convfactor = (decimal)(m.convfactor), //(decimal)m.conv_factor,
                    percentage = (m.percentage),//m.Percentage,
                    lookup = (m.lookup == null ? "" : m.lookup),//m.lookup
                    rate = (decimal)(m.rate),
                    GSTtaxcode = (m.GSTtaxcode),
                    IGSTtaxcode = (m.IGSTtaxcode),
                    MinQty = (decimal)(m.MinQty == null ? 0 : m.MinQty),
                    MaxQty = (decimal)(m.MaxQty == null ? 0 : m.MaxQty),
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IEnumerable<Domain.Item>>(null, Status.ERROR, "OOPS error occured. Please try again");
            }
        }
        public Response<IEnumerable<Domain.Item>> GetItembygrpid(string Itemgrpid)
        {
            try
            {
                var ProductEWO = itemRepo.GetItembygrpid(Itemgrpid);

                return new Response<IEnumerable<Domain.Item>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.Item>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        
    }
}
