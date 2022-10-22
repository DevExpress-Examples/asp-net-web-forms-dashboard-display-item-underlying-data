<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="ASPxDashboard_RequestUnderlyingData.Default" %>

<%@ Register Assembly="DevExpress.Dashboard.v21.2.Web.WebForms, Version=21.2.11.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" 
    Namespace="DevExpress.DashboardWeb" TagPrefix="dx" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="Scripts/UnderlyingData.js"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="detailGrid" style="position:absolute; left:600px; right:0; top:0; bottom:0;"></div>
    <div style="position:absolute; left:0; right:0; top:0; bottom:0;">
        <dx:ASPxDashboard ID="ASPxDashboard1" runat="server" DashboardStorageFolder = "~/App_Data/Dashboards" 
            WorkingMode="Viewer" ClientInstanceName="clientDashboardControl" Height="800px" Width="600px">
            <ClientSideEvents BeforeRender="onBeforeRender" />
        </dx:ASPxDashboard>
    </div>
    </form>
    <script type="text/javascript" src="<%= Page.ResolveClientUrl("~/Scripts/UnderlyingData.js") %>"></script>
</body>
</html>
