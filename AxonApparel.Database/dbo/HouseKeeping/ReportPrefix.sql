CREATE TABLE [dbo].[ReportPrefix]
(
	[Rpt_PID] [int] IDENTITY(1,1) NOT NULL Primary key,
	[Doc_Title] [varchar](100) NOT NULL,
	[Doc_Type] [char](1) NULL,
)
