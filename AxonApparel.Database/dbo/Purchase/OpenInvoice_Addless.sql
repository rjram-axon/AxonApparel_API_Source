CREATE TABLE [dbo].[OpenInvoice_Addless]
(
	[Open_InvID] [int] NULL,
	[Openiv_Addless_ID] [int] IDENTITY(1,1) NOT NULL primary key,
	[addlessid] [int] NOT NULL,
	[Percentage] [numeric](7, 2) NOT NULL,
	[Amount] [numeric](15, 2) NOT NULL,
	[AorL] [varchar](1) NULL,

	CONSTRAINT [FK_OOpen_InvID] FOREIGN KEY([Open_InvID]) REFERENCES [dbo].[OpenInvoice_Mas] ([Open_InvID])
)
