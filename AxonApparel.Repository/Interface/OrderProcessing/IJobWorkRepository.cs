using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
   public interface IJobWorkRepository
    {
       IList<JobWorkDetails> GetDataAddJobRepDetails(int? companyid, int? BuyerId, int? StyleId, string OrderNo, string RefNo, string BRefNo);
       IQueryable<JobWorkDetails> GetDataJobRepEntryDetails(string OrderNo, int StyleRowId);
       IList<JobOrderShipmentlist> GetDataShipRepDetails(int StyleRowId);
       IList<JobOrderItemlist> GetDataItemRepDetails(int StyleRowId, int? ShipRowId);
       bool AddDetData(Job_Ord_Mas objjoEntry, List<Job_Ord_Det> objjoDet, List<Job_Ord_Color> objjoOrd, List<Job_Ord_Sum> objjsoOrd, List<Job_Ord_BomDet> objjoBomDet, Job_Ord_BOMMas objjobomEntry);
       bool UpdateDetData(Job_Ord_Mas objEjoEntry, List<Job_Ord_Det> objEjoDet, List<Job_Ord_Color> objEjoOrd, List<Job_Ord_Sum> objEjsoOrd, List<Job_Ord_BomDet> objEjoBomDet, Job_Ord_BOMMas objEjobomEntry);
       bool DeleteDetData(Job_Ord_Mas objDjoEntry, List<Job_Ord_Det> objDjoDet, List<Job_Ord_Color> objDjoOrd, List<Job_Ord_Sum> objDjsoOrd, List<Job_Ord_BomDet> objDjoBomDet, Job_Ord_BOMMas objDjobomEntry);
       IList<Bom> GetDetList(string orderno, int styleid, string OType, string StageType, string JobOrderNo);


       IQueryable<JobWorkDetails> GetDatajobMainRepDetails(int? companyid, int? BuyerId, int? SupplierId, int? StyleId, string OrderNo, string RefNo, string JobOrderNo, string Fdate, string Tdate, string OrderType, string DispatchClosed);

       IQueryable<JobWorkDetails> GetDataRepEditjobDetails(int Id, int StyRowId);
       IList<JobOrderShipmentlist> GetRepEditJobShipLoad(int Id, int StyRowId);
       IList<JobOrderItemlist> GetRepEditJobItemLoad(int Id);
       IQueryable<JobWorkDetails> GetRepStageList();
    }
}
