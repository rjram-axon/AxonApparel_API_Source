using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IJobWorkBusiness
    {
        Response<IList<JobWorkDetails>> ListJobAddDetails(int? companyid, int? BuyerId, int? StyleId, string OrderNo, string RefNo, string BRefNo);
        Response<IQueryable<JobWorkDetails>> GetLoadJobEntryDetails(string OrderNo, int StyleRowId);
        Response<IList<JobOrderShipmentlist>> ListJobShipDetails(int StyleRowId);
        Response<IList<JobOrderItemlist>> ListJobItemDetails(int StyleRowId, int? ShipRowId);

        Response<bool> CreateJobEntry(JobWorkDetails JobEnty);
        Response<bool> UpdateJobWorkEntry(JobWorkDetails JobEEnty);
        Response<bool> DeleteJobWorkEntry(JobWorkDetails JobDEnty);
        Response<IList<Bom>> GetList(string orderno, int styleid, string OType, string StageType, string JobOrderNo);


        Response<IQueryable<JobWorkDetails>> GetDataJobMainDetails(int? companyid, int? BuyerId, int? SupplierId, int? StyleId, string OrderNo, string RefNo, string JobOrderNo, string Fdate, string Tdate, string OrderType, string DispatchClosed);

        Response<IQueryable<JobWorkDetails>> GetJobEditDetails(int Id,int StyRowId);
        Response<IList<JobOrderShipmentlist>> ListJobEditShipDetails(int Id, int StyRowId);
        Response<IList<JobOrderItemlist>> ListJobEditItemDetails(int Id);
        Response<IQueryable<JobWorkDetails>> GetBussStage();

    }
}
