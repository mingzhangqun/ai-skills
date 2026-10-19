// rkcam-console — single-file build (bundle + embedded index.html)
// deps: npm i sharp ssh2 ; run: node rkcam-console.js [--port 8092]

"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};

// <define:__IQ_SCHEMA__>
var define_IQ_SCHEMA_default;
var init_define_IQ_SCHEMA = __esm({
  "<define:__IQ_SCHEMA__>"() {
    define_IQ_SCHEMA_default = { _meta: { generated: "2026-10-19", source: "rkaiq include/iq_parser_v2 headers", hot_prefixes: ["ae_", "wb_", "ablc", "lut3d", "adegamma", "agic_", "debayer", "demosaic", "amerge", "merge", "adrc", "drc", "agamma", "gamma", "adehaze", "dehaze", "adpcc", "dpc", "aldch", "ldch", "cproc", "cp", "ie", "lsc", "bayernr", "bayer2dnr", "bayertnr", "ynr", "cnr", "sharp", "cac", "af_", "gain_", "csm", "cgc", "ccm_", "yuvme_", "argbir", "rgbir", "ldc"], enums: 77, structs: 858, fixed: { "sensor_calib/resolution": "mode resolution, must match sensor mode (datasheet)", "sensor_calib/Gain2Reg": "vendor gain\u2192register formula (datasheet; Sony = NONLINEAR_DB)", "sensor_calib/Time2Reg": "time\u2194line-count conversion (generic default, vendor: rarely changed)", "sensor_calib/CISGainSet": "again/dgain range (datasheet; wrong \u2192 wrong gain ceiling)", "sensor_calib/CISTimeSet": "exposure line timing (datasheet; wrong \u2192 underflow at low exposure)", "sensor_calib/CISHdrSet": "HDR frame mode = hardware capability (datasheet)", "sensor_calib/CISDcgSet": "DCG support = hardware capability (datasheet)", "sensor_calib/CISExpUpdate": "exposure update latency in frames (datasheet; wrong \u2192 exposure flicker)", "sensor_calib/CISHdrMultSet": "HDR multi-frame gain register layer (datasheet)", "sensor_calib/iso_list": "ISO step table (calibration companion)", "ae_calib/CommCtrl/HistStatsMode": "histogram stats channel (pipeline companion)", "ae_calib/CommCtrl/RawStatsMode": "RAW stats channel (pipeline companion)", "ae_calib/CommCtrl/YRangeMode": "Y range full/limited (matches sensor bit depth)", "ae_calib/CommCtrl/AecWinScale": "AE stats window (default full)", "ae_calib/CommCtrl/AecEnvLvCalib": "EnvLv calibration coefficient (calibration product)", "ae_calib/SyncTest": "sync test path (not a product feature)", "ae_calib/IrisCtrl": "iris control (module has no iris hardware)", "wb_v21/autoPara/rgb2TcsPara": "RGB\u2192TCS colorspace matrix (fixed math)", "wb_v21/autoPara/rgb2RotationYuvMat": "RGB\u2192YUV rotation matrix (fixed math)", "wb_v21/autoPara/mainWindow": "AWB stats window (default full)", "wb_v21/autoPara/downScaleMode": "stats downscale mode (pipeline companion)", "wb_v21/autoPara/blkMeasureMode": "block stats mode (pipeline companion)", "ccm_calib/TuningPara/matrixAll": "3x3 color matrix = calibration product (vendor: don't hand-edit; for color cast check AWB/BLC first)", "agamma_calib_v11/GammaTuningPara/Gamma_out_segnum": "curve interpolation type (structural choice)" } }, sensor_calib: { "resolution/width": { r: [0, 65535], s: 1 }, "resolution/height": { r: [0, 65535], s: 1 }, "Gain2Reg/GainMode": { e: ["EXPGAIN_MODE_LINEAR", "EXPGAIN_MODE_NONLINEAR_DB"] }, "Gain2Reg/GainRange_len": { r: [7, 70], s: 1 }, "Gain2Reg/GainRange": { r: [-65535, 65535], s: 9999999999999999e-20, a: true }, "Gain2Reg/GainRegDBUnit": { r: [0, 1], s: 9999999999999999e-20 }, "Time2Reg/fCoeff": { r: [-65535, 65535], s: 1e-6, a: true }, "CISGainSet/CISAgainRange/Min": { r: [0, 65535], s: 1e-3 }, "CISGainSet/CISAgainRange/Max": { r: [0, 65535], s: 1e-3 }, "CISGainSet/CISExtraAgainRange/Min": { r: [0, 65535], s: 1e-3 }, "CISGainSet/CISExtraAgainRange/Max": { r: [0, 65535], s: 1e-3 }, "CISGainSet/CISDgainRange/Min": { r: [0, 65535], s: 1e-3 }, "CISGainSet/CISDgainRange/Max": { r: [0, 65535], s: 1e-3 }, "CISGainSet/CISIspDgainRange/Min": { r: [0, 65535], s: 1e-3 }, "CISGainSet/CISIspDgainRange/Max": { r: [0, 65535], s: 1e-3 }, "CISGainSet/CISHdrGainIndSetEn": { b: 1 }, "CISTimeSet/Linear/CISLinTimeRegMaxFac/fCoeff": { r: [-65535, 65535], s: 1e-6, a: true }, "CISTimeSet/Linear/CISTimeRegOdevity/fCoeff": { r: [-65535, 65535], s: 1e-6, a: true }, "CISTimeSet/Linear/CISTimeLinePerReg": { r: [0, 100], s: 1e-3 }, "CISTimeSet/Linear/CISTimeOffsetUs": { r: [-65535, 65535], s: 1e-3 }, "CISTimeSet/Hdr/#/name": { e: ["HDR_TWO_FRAME", "HDR_THREE_FRAME"] }, "CISTimeSet/Hdr/#/CISTimeRegUnEqualEn": { b: 1 }, "CISTimeSet/Hdr/#/CISHdrTimeRegSumFac/fCoeff": { r: [-65535, 65535], s: 1e-6, a: true }, "CISTimeSet/Hdr/#/CISTimeRegOdevity/fCoeff": { r: [-65535, 65535], s: 1e-6, a: true }, "CISTimeSet/Hdr/#/CISTimeLinePerReg": { r: [0, 100], s: 1e-3 }, "CISTimeSet/Hdr/#/CISTimeOffsetUs/fCoeff": { r: [-65535, 65535], s: 1e-6, a: true }, "CISHdrSet/hdr_en": { b: 1 }, "CISHdrSet/hdr_mode": { e: ["RK_AIQ_ISP_HDR_MODE_2_FRAME_HDR", "RK_AIQ_ISP_HDR_MODE_2_LINE_HDR", "RK_AIQ_ISP_HDR_MODE_2_BUILTIN", "RK_AIQ_ISP_HDR_MODE_3_FRAME_HDR", "RK_AIQ_ISP_HDR_MODE_3_LINE_HDR", "RK_AIQ_ISP_HDR_MODE_3_BUILTIN"] }, "CISHdrSet/line_mode": { e: ["RKAIQ_SENSOR_HDR_MODE_STAGGER", "RKAIQ_SENSOR_HDR_MODE_DCG", "RKAIQ_SENSOR_HDR3_DCG_VS", "RKAIQ_SENSOR_HDR3_DCG_SPD", "RKAIQ_SENSOR_HDR3_STA", "RKAIQ_SENSOR_HDR3_DCG_LOFIC", "RKAIQ_SENSOR_HDR3_LCG_LOFIC_VS"] }, "CISDcgSet/Linear/support_en": { b: 1 }, "CISDcgSet/Linear/dcg_optype": { e: ["RK_AIQ_OP_MODE_AUTO", "RK_AIQ_OP_MODE_MANUAL"] }, "CISDcgSet/Linear/dcg_mode/Coeff": { r: [-65535, 65535], s: 1, a: true }, "CISDcgSet/Linear/dcg_ratio": { r: [1, 100], s: 0.01 }, "CISDcgSet/Linear/sync_switch": { b: 1 }, "CISDcgSet/Linear/lcg2hcg_gain_th": { r: [1, 4096], s: 0.01 }, "CISDcgSet/Linear/hcg2lcg_gain_th": { r: [1, 4096], s: 0.01 }, "CISDcgSet/Hdr/support_en": { b: 1 }, "CISDcgSet/Hdr/dcg_optype": { e: ["RK_AIQ_OP_MODE_AUTO", "RK_AIQ_OP_MODE_MANUAL"] }, "CISDcgSet/Hdr/dcg_mode/Coeff": { r: [-65535, 65535], s: 1, a: true }, "CISDcgSet/Hdr/dcg_ratio": { r: [1, 100], s: 0.01 }, "CISDcgSet/Hdr/sync_switch": { b: 1 }, "CISDcgSet/Hdr/lcg2hcg_gain_th": { r: [1, 4096], s: 0.01 }, "CISDcgSet/Hdr/hcg2lcg_gain_th": { r: [1, 4096], s: 0.01 }, "CISExpUpdate/Linear/time_update": { r: [0, 10], s: 1 }, "CISExpUpdate/Linear/gain_update": { r: [0, 10], s: 1 }, "CISExpUpdate/Linear/dcg_update": { r: [0, 10], s: 1 }, "CISExpUpdate/Hdr/time_update": { r: [0, 10], s: 1 }, "CISExpUpdate/Hdr/gain_update": { r: [0, 10], s: 1 }, "CISExpUpdate/Hdr/dcg_update": { r: [0, 10], s: 1 }, CISMinFps: { r: [1, 100], s: 0.01 }, CISFlip: { r: [0, 3], s: 1 }, iso_list: { r: [0, 2048e3], s: 0.1, a: true }, "CISHdrMultSet/#/ExpMode": { e: ["RKAIQ_SENSOR_HDR_MODE_STAGGER", "RKAIQ_SENSOR_HDR_MODE_DCG", "RKAIQ_SENSOR_HDR3_DCG_VS", "RKAIQ_SENSOR_HDR3_DCG_SPD", "RKAIQ_SENSOR_HDR3_STA", "RKAIQ_SENSOR_HDR3_DCG_LOFIC", "RKAIQ_SENSOR_HDR3_LCG_LOFIC_VS"] }, "CISHdrMultSet/#/CISFrmBit": { e: ["LFRM_USE_10BIT", "LFRM_USE_12BIT"] }, "CISHdrMultSet/#/CISGainSet/CISAgainRange/Min": { r: [0, 65535], s: 1e-3, a: true }, "CISHdrMultSet/#/CISGainSet/CISAgainRange/Max": { r: [0, 65535], s: 1e-3, a: true }, "CISHdrMultSet/#/CISGainSet/CISDgainRange/Min": { r: [0, 65535], s: 1e-3, a: true }, "CISHdrMultSet/#/CISGainSet/CISDgainRange/Max": { r: [0, 65535], s: 1e-3, a: true }, "CISHdrMultSet/#/CISGainSet/CISDcgMode/Coeff": { r: [-65535, 65535], s: 1, a: true }, "CISHdrMultSet/#/CISGainSet/CISDgainRegIndSetEn/Coeff": { r: [-65535, 65535], s: 1, a: true }, "CISHdrMultSet/#/CISGainSet/CISDGain2Reg/GainMode": { e: ["EXPGAIN_MODE_LINEAR", "EXPGAIN_MODE_NONLINEAR_DB"] }, "CISHdrMultSet/#/CISGainSet/CISDGain2Reg/GainRange_len": { r: [7, 70], s: 1 }, "CISHdrMultSet/#/CISGainSet/CISDGain2Reg/GainRange": { r: [-65535, 65535], s: 9999999999999999e-20, a: true }, "CISHdrMultSet/#/CISGainSet/CISDGain2Reg/GainRegDBUnit": { r: [0, 1], s: 9999999999999999e-20 }, "CISHdrMultSet/#/CISGainSet/CISHdrGainIndSetEn": { b: 1 }, "CISHdrMultSet/#/CISTimeSet/CISTimeRegUnEqualEn": { b: 1 }, "CISHdrMultSet/#/CISTimeSet/CISHdrTimeRegSumFac/fCoeff": { r: [-65535, 65535], s: 1e-6, a: true }, "CISHdrMultSet/#/CISTimeSet/CISTimeRegOdevity/fCoeff": { r: [-65535, 65535], s: 1e-6, a: true }, "CISHdrMultSet/#/CISTimeSet/CISTimeLinePerReg": { r: [0, 100], s: 1e-3 }, "CISHdrMultSet/#/CISTimeSet/CISTimeOffsetUs/fCoeff": { r: [-65535, 65535], s: 1e-6, a: true }, CISHdrMultSet_len: { r: [0, 10], s: 1 } }, ae_calib: { "CommCtrl/Enable": { b: 1 }, "CommCtrl/AecRunInterval": { r: [0, 255], s: 1 }, "CommCtrl/AecOpType": { e: ["RK_AIQ_OP_MODE_AUTO", "RK_AIQ_OP_MODE_MANUAL"] }, "CommCtrl/HistStatsMode": { e: ["CAM_HISTV2_MODE_RGB_COMBINED", "CAM_HISTV2_MODE_R", "CAM_HISTV2_MODE_G", "CAM_HISTV2_MODE_B", "CAM_HISTV2_MODE_Y"] }, "CommCtrl/RawStatsMode": { e: ["CAM_RAWSTATSV2_MODE_R", "CAM_RAWSTATSV2_MODE_G", "CAM_RAWSTATSV2_MODE_B", "CAM_RAWSTATSV2_MODE_Y"] }, "CommCtrl/YRangeMode": { e: ["CAM_YRANGEV2_MODE_FULL", "CAM_YRANGEV2_MODE_LIMITED"] }, "CommCtrl/AecGridWeight": { r: [0, 32], s: 1, a: true }, "CommCtrl/AecManualCtrl/LinearAE/ManualTimeEn": { b: 1 }, "CommCtrl/AecManualCtrl/LinearAE/ManualGainEn": { b: 1 }, "CommCtrl/AecManualCtrl/LinearAE/ManualIspDgainEn": { b: 1 }, "CommCtrl/AecManualCtrl/LinearAE/TimeValue": { r: [0, 1], s: 1e-6 }, "CommCtrl/AecManualCtrl/LinearAE/GainValue": { r: [1, 4096], s: 1e-3 }, "CommCtrl/AecManualCtrl/LinearAE/IspDGainValue": { r: [1, 4096], s: 1e-3 }, "CommCtrl/AecManualCtrl/HdrAE/ManualTimeEn": { b: 1 }, "CommCtrl/AecManualCtrl/HdrAE/ManualGainEn": { b: 1 }, "CommCtrl/AecManualCtrl/HdrAE/ManualIspDgainEn": { b: 1 }, "CommCtrl/AecManualCtrl/HdrAE/TimeValue": { r: [0, 1], s: 1e-6, a: true }, "CommCtrl/AecManualCtrl/HdrAE/GainValue": { r: [1, 4096], s: 1e-3, a: true }, "CommCtrl/AecManualCtrl/HdrAE/IspDGainValue": { r: [1, 4096], s: 1e-3, a: true }, "CommCtrl/AecSpeed/SmoothEn": { b: 1 }, "CommCtrl/AecSpeed/DampOver": { r: [0, 1], s: 0.01 }, "CommCtrl/AecSpeed/DampUnder": { r: [0, 1], s: 0.01 }, "CommCtrl/AecSpeed/DampDark2Bright": { r: [0, 1], s: 0.01 }, "CommCtrl/AecSpeed/DampBright2Dark": { r: [0, 1], s: 0.01 }, "CommCtrl/AecSpeed/DyDamp/DyDampEn": { b: 1 }, "CommCtrl/AecSpeed/DyDamp/SlowOPType": { e: ["RK_AIQ_OP_MODE_AUTO", "RK_AIQ_OP_MODE_MANUAL"] }, "CommCtrl/AecSpeed/DyDamp/SlowRange": { r: [0, 100], s: 0.01 }, "CommCtrl/AecSpeed/DyDamp/SlowDamp": { r: [0, 1], s: 0.01 }, "CommCtrl/AecDelay/DelayType": { e: ["DELAY_TYPE_FRAME", "DELAY_TYPE_TIME"] }, "CommCtrl/AecDelay/BlackDelay": { r: [0, 255], s: 1 }, "CommCtrl/AecDelay/WhiteDelay": { r: [0, 255], s: 1 }, "CommCtrl/AecFrameRateMode/isFpsFix": { b: 1 }, "CommCtrl/AecFrameRateMode/FpsValue": { r: [0, 1024], s: 0.1 }, "CommCtrl/AecAntiFlicker/enable": { b: 1 }, "CommCtrl/AecAntiFlicker/Frequency": { e: ["AECV2_FLICKER_FREQUENCY_OFF", "AECV2_FLICKER_FREQUENCY_50HZ", "AECV2_FLICKER_FREQUENCY_60HZ", "AECV2_FLICKER_FREQUENCY_AUTO"] }, "CommCtrl/AecAntiFlicker/Mode": { e: ["AECV2_ANTIFLICKER_AUTO_MODE", "AECV2_ANTIFLICKER_NORMAL_MODE"] }, "CommCtrl/AecEnvLvCalib/Enable": { b: 1 }, "CommCtrl/AecEnvLvCalib/CalibFNumber": { r: [0, 256], s: 0.01 }, "CommCtrl/AecEnvLvCalib/CurveCoeff": { r: [-1024, 1024], s: 9999999999999999e-21, a: true }, "CommCtrl/AecWinScale/InRawWinScale/h_offs": { r: [0, 1], s: 0.01 }, "CommCtrl/AecWinScale/InRawWinScale/v_offs": { r: [0, 1], s: 0.01 }, "CommCtrl/AecWinScale/InRawWinScale/h_size": { r: [0, 1], s: 0.01 }, "CommCtrl/AecWinScale/InRawWinScale/v_size": { r: [0, 1], s: 0.01 }, "CommCtrl/AecWinScale/TmoRawWinScale/h_offs": { r: [0, 1], s: 0.01 }, "CommCtrl/AecWinScale/TmoRawWinScale/v_offs": { r: [0, 1], s: 0.01 }, "CommCtrl/AecWinScale/TmoRawWinScale/h_size": { r: [0, 1], s: 0.01 }, "CommCtrl/AecWinScale/TmoRawWinScale/v_size": { r: [0, 1], s: 0.01 }, "CommCtrl/AecWinScale/YuvWinScale/h_offs": { r: [0, 1], s: 0.01 }, "CommCtrl/AecWinScale/YuvWinScale/v_offs": { r: [0, 1], s: 0.01 }, "CommCtrl/AecWinScale/YuvWinScale/h_size": { r: [0, 1], s: 0.01 }, "CommCtrl/AecWinScale/YuvWinScale/v_size": { r: [0, 1], s: 0.01 }, "LinearAeCtrl/RawStatsEn": { b: 1 }, "LinearAeCtrl/ToleranceIn": { r: [0, 100], s: 0.01 }, "LinearAeCtrl/ToleranceOut": { r: [0, 100], s: 0.01 }, "LinearAeCtrl/Evbias": { r: [-500, 500], s: 0.01 }, "LinearAeCtrl/StrategyMode": { e: ["AECV2_STRATEGY_MODE_LOWLIGHT", "AECV2_STRATEGY_MODE_HIGHLIGHT"] }, "LinearAeCtrl/InitExp/InitTimeValue": { r: [0, 1], s: 1e-6 }, "LinearAeCtrl/InitExp/InitGainValue": { r: [1, 4096], s: 1e-3 }, "LinearAeCtrl/InitExp/InitIspDGainValue": { r: [1, 4096], s: 1e-3 }, "LinearAeCtrl/InitExp/InitPIrisGainValue": { r: [1, 4096], s: 1 }, "LinearAeCtrl/InitExp/InitDCIrisDutyValue": { r: [0, 100], s: 1 }, "LinearAeCtrl/InitExp/InitHDCIrisTargetValue": { r: [0, 1023], s: 1 }, "LinearAeCtrl/Route/TimeDot": { r: [0, 1], s: 1e-6, a: true }, "LinearAeCtrl/Route/GainDot": { r: [1, 4096], s: 1e-3, a: true }, "LinearAeCtrl/Route/IspDGainDot": { r: [1, 4096], s: 1e-3, a: true }, "LinearAeCtrl/Route/PIrisDot": { r: [1, 4096], s: 1, a: true }, "LinearAeCtrl/DySetpoint/ExpLevel": { r: [0, 4096], s: 9999999999999999e-21, a: true }, "LinearAeCtrl/DySetpoint/DySetpoint": { r: [0, 255], s: 0.01, a: true }, "LinearAeCtrl/BackLightCtrl/Enable": { b: 1 }, "LinearAeCtrl/BackLightCtrl/StrBias": { r: [-500, 500], s: 0.01 }, "LinearAeCtrl/BackLightCtrl/MeasArea": { e: ["AECV2_MEASURE_AREA_AUTO", "AECV2_MEASURE_AREA_UP", "AECV2_MEASURE_AREA_BOTTOM", "AECV2_MEASURE_AREA_LEFT", "AECV2_MEASURE_AREA_RIGHT", "AECV2_MEASURE_AREA_CENTER"] }, "LinearAeCtrl/BackLightCtrl/OEROILowTh": { r: [0, 255], s: 0.01 }, "LinearAeCtrl/BackLightCtrl/LumaDistTh": { r: [0, 100], s: 0.01 }, "LinearAeCtrl/BackLightCtrl/LvLowTh": { r: [0, 100], s: 9999999999999999e-20 }, "LinearAeCtrl/BackLightCtrl/LvHighTh": { r: [0, 100], s: 9999999999999999e-20 }, "LinearAeCtrl/BackLightCtrl/BacklitSetPoint/ExpLevel": { r: [0, 4096], s: 9999999999999999e-21, a: true }, "LinearAeCtrl/BackLightCtrl/BacklitSetPoint/NonOEPdfTh": { r: [0, 1], s: 0.01, a: true }, "LinearAeCtrl/BackLightCtrl/BacklitSetPoint/LowLightPdfTh": { r: [0, 1], s: 0.01, a: true }, "LinearAeCtrl/BackLightCtrl/BacklitSetPoint/TargetLLLuma": { r: [0, 255], s: 0.01, a: true }, "LinearAeCtrl/OverExpCtrl/Enable": { b: 1 }, "LinearAeCtrl/OverExpCtrl/StrBias": { r: [-500, 500], s: 0.01 }, "LinearAeCtrl/OverExpCtrl/MaxWeight": { r: [0, 20], s: 0.01 }, "LinearAeCtrl/OverExpCtrl/HighLightTh": { r: [0, 255], s: 0.01 }, "LinearAeCtrl/OverExpCtrl/LowLightTh": { r: [0, 255], s: 0.01 }, "LinearAeCtrl/OverExpCtrl/OverExpSetPoint/OEpdf": { r: [0, 1], s: 0.01, a: true }, "LinearAeCtrl/OverExpCtrl/OverExpSetPoint/LowLightWeight": { r: [0, 20], s: 0.01, a: true }, "LinearAeCtrl/OverExpCtrl/OverExpSetPoint/HighLightWeight": { r: [0, 20], s: 0.01, a: true }, "HdrAeCtrl/ToleranceIn": { r: [0, 100], s: 0.01 }, "HdrAeCtrl/ToleranceOut": { r: [0, 100], s: 0.01 }, "HdrAeCtrl/Evbias": { r: [-500, 500], s: 1 }, "HdrAeCtrl/StrategyMode": { e: ["AECV2_STRATEGY_MODE_LOWLIGHT", "AECV2_STRATEGY_MODE_HIGHLIGHT"] }, "HdrAeCtrl/LumaDistTh": { r: [0, 100], s: 0.01 }, "HdrAeCtrl/InitExp/InitTimeValue": { r: [0, 1], s: 1e-6, a: true }, "HdrAeCtrl/InitExp/InitGainValue": { r: [1, 4096], s: 1e-3, a: true }, "HdrAeCtrl/InitExp/InitIspDGainValue": { r: [1, 4096], s: 1e-3, a: true }, "HdrAeCtrl/InitExp/InitPIrisGainValue": { r: [1, 4096], s: 1 }, "HdrAeCtrl/InitExp/InitDCIrisDutyValue": { r: [0, 100], s: 1 }, "HdrAeCtrl/InitExp/InitHDCIrisTargetValue": { r: [0, 1023], s: 1 }, "HdrAeCtrl/Route/Frm0TimeDot": { r: [0, 1], s: 1e-6, a: true }, "HdrAeCtrl/Route/Frm0GainDot": { r: [1, 4096], s: 1e-3, a: true }, "HdrAeCtrl/Route/Frm0IspDGainDot": { r: [1, 4096], s: 1e-3, a: true }, "HdrAeCtrl/Route/Frm1TimeDot": { r: [0, 1], s: 1e-6, a: true }, "HdrAeCtrl/Route/Frm1GainDot": { r: [1, 4096], s: 1e-3, a: true }, "HdrAeCtrl/Route/Frm1IspDGainDot": { r: [1, 4096], s: 1e-3, a: true }, "HdrAeCtrl/Route/Frm2TimeDot": { r: [0, 1], s: 1e-6, a: true }, "HdrAeCtrl/Route/Frm2GainDot": { r: [1, 4096], s: 1e-3, a: true }, "HdrAeCtrl/Route/Frm2IspDGainDot": { r: [1, 4096], s: 1e-3, a: true }, "HdrAeCtrl/Route/PIrisDot": { r: [1, 4096], s: 1, a: true }, "HdrAeCtrl/ExpRatioCtrl/ExpRatioType": { e: ["AECV2_HDR_RATIOTYPE_MODE_AUTO", "AECV2_HDR_RATIOTYPE_MODE_FIX"] }, "HdrAeCtrl/ExpRatioCtrl/ExpRatio/RatioExpDot": { r: [0, 1], s: 9999999999999999e-20, a: true }, "HdrAeCtrl/ExpRatioCtrl/ExpRatio/M2SRatioFix": { r: [1, 256], s: 0.01, a: true }, "HdrAeCtrl/ExpRatioCtrl/ExpRatio/L2MRatioFix": { r: [1, 256], s: 0.01, a: true }, "HdrAeCtrl/ExpRatioCtrl/ExpRatio/M2SRatioMax": { r: [1, 256], s: 0.01, a: true }, "HdrAeCtrl/ExpRatioCtrl/ExpRatio/L2MRatioMax": { r: [1, 256], s: 0.01, a: true }, "HdrAeCtrl/LongFrmMode/mode": { e: ["AECV2_HDR_LONGFRMMODE_DISABLE", "AECV2_HDR_LONGFRMMODE_AUTO", "AECV2_HDR_LONGFRMMODE_ENABLE"] }, "HdrAeCtrl/LongFrmMode/SfrmMinLine": { r: [0, 1024], s: 1 }, "HdrAeCtrl/LongFrmMode/LfrmModeExpTh": { r: [0, 100], s: 9999999999999999e-20 }, "HdrAeCtrl/LframeCtrl/OEROILowTh": { r: [0, 255], s: 0.01 }, "HdrAeCtrl/LframeCtrl/LvLowTh": { r: [0, 100], s: 9999999999999999e-20 }, "HdrAeCtrl/LframeCtrl/LvHighTh": { r: [0, 100], s: 9999999999999999e-20 }, "HdrAeCtrl/LframeCtrl/LfrmSetPoint/LExpLevel": { r: [0, 4096], s: 9999999999999999e-21, a: true }, "HdrAeCtrl/LframeCtrl/LfrmSetPoint/NonOEPdfTh": { r: [0, 1], s: 0.01, a: true }, "HdrAeCtrl/LframeCtrl/LfrmSetPoint/LowLightPdfTh": { r: [0, 1], s: 0.01, a: true }, "HdrAeCtrl/LframeCtrl/LfrmSetPoint/LSetPoint": { r: [0, 255], s: 0.01, a: true }, "HdrAeCtrl/LframeCtrl/LfrmSetPoint/TargetLLLuma": { r: [0, 255], s: 0.01, a: true }, "HdrAeCtrl/MframeCtrl/MExpLevel": { r: [0, 4096], s: 9999999999999999e-21, a: true }, "HdrAeCtrl/MframeCtrl/MSetPoint": { r: [0, 255], s: 0.01, a: true }, "HdrAeCtrl/SframeCtrl/HLROIExpandEn": { b: 1 }, "HdrAeCtrl/SframeCtrl/HLLumaTolerance": { r: [0, 100], s: 0.01 }, "HdrAeCtrl/SframeCtrl/SfrmSetPoint/SExpLevel": { r: [0, 4096], s: 1e-6, a: true }, "HdrAeCtrl/SframeCtrl/SfrmSetPoint/SSetPoint": { r: [0, 255], s: 0.01, a: true }, "HdrAeCtrl/SframeCtrl/SfrmSetPoint/TargetHLLuma": { r: [0, 255], s: 0.01, a: true }, "IrisCtrl/Enable": { b: 1 }, "IrisCtrl/IrisType": { e: ["IRISV2_DC_TYPE", "IRISV2_P_TYPE", "IRISV2_HDC_TYPE"] }, "IrisCtrl/ManualEn": { b: 1 }, "IrisCtrl/ManualAttr/PIrisGainValue": { r: [1, 4096], s: 1 }, "IrisCtrl/ManualAttr/DCIrisHoldValue": { r: [0, 100], s: 1 }, "IrisCtrl/ManualAttr/HDCIrisTargetValue": { r: [0, 1023], s: 1 }, "IrisCtrl/InitAttr/PIrisGainValue": { r: [1, 4096], s: 1 }, "IrisCtrl/InitAttr/DCIrisHoldValue": { r: [0, 100], s: 1 }, "IrisCtrl/InitAttr/HDCIrisTargetValue": { r: [0, 1023], s: 1 }, "IrisCtrl/PIrisAttr/TotalStep": { r: [0, 1024], s: 1 }, "IrisCtrl/PIrisAttr/EffcStep": { r: [0, 1024], s: 1 }, "IrisCtrl/PIrisAttr/ZeroIsMax": { b: 1 }, "IrisCtrl/PIrisAttr/StepTable": { r: [1, 4096], s: 1, a: true }, "IrisCtrl/DCIrisAttr/Kp": { r: [0, 10], s: 0.01 }, "IrisCtrl/DCIrisAttr/Ki": { r: [0, 10], s: 0.01 }, "IrisCtrl/DCIrisAttr/Kd": { r: [0, 10], s: 0.01 }, "IrisCtrl/DCIrisAttr/MinPwmDuty": { r: [0, 100], s: 1 }, "IrisCtrl/DCIrisAttr/MaxPwmDuty": { r: [0, 100], s: 1 }, "IrisCtrl/DCIrisAttr/OpenPwmDuty": { r: [0, 100], s: 1 }, "IrisCtrl/DCIrisAttr/ClosePwmDuty": { r: [0, 100], s: 1 }, "IrisCtrl/HDCIrisAttr/DampOver": { r: [0, 1], s: 0.01 }, "IrisCtrl/HDCIrisAttr/DampUnder": { r: [0, 1], s: 0.01 }, "IrisCtrl/HDCIrisAttr/ZeroIsMax": { b: 1 }, "IrisCtrl/HDCIrisAttr/MinTarget": { r: [0, 1023], s: 1 }, "IrisCtrl/HDCIrisAttr/MaxTarget": { r: [0, 1023], s: 1 }, "IrisCtrl/HDCIrisAttr/ZoomTargetDot": { r: [0, 1023], s: 1, a: true }, "IrisCtrl/HDCIrisAttr/ZoomDot": { r: [-32768, 32767], s: 1, a: true }, "IrisCtrl/HDCIrisAttr/GainDot": { r: [1, 512], s: 1, a: true }, "IrisCtrl/HDCIrisAttr/ZoomTargetDot_len": { r: [1, 256], s: 1 }, "IrisCtrl/HDCIrisAttr/IrisTargetDot_len": { r: [1, 256], s: 1 }, "SyncTest/Enable": { b: 1 }, "SyncTest/IntervalFrm": { r: [0, 1024], s: 1 }, "SyncTest/AlterExp/LinearAE/#/TimeValue": { r: [0, 1], s: 1e-6 }, "SyncTest/AlterExp/LinearAE/#/GainValue": { r: [1, 4096], s: 1e-3 }, "SyncTest/AlterExp/LinearAE/#/IspDGainValue": { r: [1, 4096], s: 1e-3 }, "SyncTest/AlterExp/LinearAE/#/PIrisGainValue": { r: [1, 4096], s: 1 }, "SyncTest/AlterExp/LinearAE/#/DcgMode": { r: [-1, 1], s: 1 }, "SyncTest/AlterExp/HdrAE/#/TimeValue": { r: [0, 1], s: 1e-6, a: true }, "SyncTest/AlterExp/HdrAE/#/GainValue": { r: [1, 4096], s: 1e-3, a: true }, "SyncTest/AlterExp/HdrAE/#/IspDGainValue": { r: [1, 4096], s: 1e-3, a: true }, "SyncTest/AlterExp/HdrAE/#/DcgMode": { r: [-1, 1], s: 1, a: true } }, ablc_calib: { "BlcTuningPara/enable": { b: 1 }, "BlcTuningPara/BLC_Data/ISO": { r: [0, 1e7], s: 9999999999999999e-20, a: true }, "BlcTuningPara/BLC_Data/R_Channel": { r: [0, 4095], s: 9999999999999999e-20, a: true }, "BlcTuningPara/BLC_Data/Gr_Channel": { r: [0, 4095], s: 9999999999999999e-20, a: true }, "BlcTuningPara/BLC_Data/Gb_Channel": { r: [0, 4095], s: 9999999999999999e-20, a: true }, "BlcTuningPara/BLC_Data/B_Channel": { r: [0, 4095], s: 9999999999999999e-20, a: true }, "Blc1TuningPara/enable": { b: 1 }, "Blc1TuningPara/BLC_Data/ISO": { r: [0, 1e7], s: 9999999999999999e-20, a: true }, "Blc1TuningPara/BLC_Data/R_Channel": { r: [0, 4095], s: 9999999999999999e-20, a: true }, "Blc1TuningPara/BLC_Data/Gr_Channel": { r: [0, 4095], s: 9999999999999999e-20, a: true }, "Blc1TuningPara/BLC_Data/Gb_Channel": { r: [0, 4095], s: 9999999999999999e-20, a: true }, "Blc1TuningPara/BLC_Data/B_Channel": { r: [0, 4095], s: 9999999999999999e-20, a: true } }, wb_v21: { "control/byPass": { b: 1 }, "control/mode": { e: ["CALIB_WB_MODE_MANUAL", "CALIB_WB_MODE_AUTO"] }, "manualPara/mode": { e: ["CALIB_MWB_MODE_CCT", "CALIB_MWB_MODE_WBGAIN", "CALIB_MWB_MODE_SCENE"] }, "manualPara/cfg/mwbGain": { r: [0, 8], s: 9999999999999999e-20, a: true }, "manualPara/cfg/scene": { e: ["CALIB_WB_SCENE_INCANDESCENT", "CALIB_WB_SCENE_FLUORESCENT", "CALIB_WB_SCENE_WARM_FLUORESCENT", "CALIB_WB_SCENE_DAYLIGHT", "CALIB_WB_SCENE_CLOUDY_DAYLIGHT", "CALIB_WB_SCENE_TWILIGHT", "CALIB_WB_SCENE_SHADE"] }, "manualPara/cfg/cct/CCT": { r: [0, 1e4], s: 1 }, "manualPara/cfg/cct/CCRI": { r: [-2, 2], s: 1e-3 }, "autoPara/hdrPara/frameChooseMode": { e: ["CALIB_AWB_HDR_FR_CH_MANUAL", "CALIB_AWB_HDR_FR_CH_AUTO"] }, "autoPara/lscBypassEnable": { b: 1 }, "autoPara/uvDetectionEnable": { b: 1 }, "autoPara/xyDetectionEnable": { b: 1 }, "autoPara/yuvDetectionEnable": { b: 1 }, "autoPara/blkStatisticsEnable": { b: 1 }, "autoPara/downScaleMode": { e: ["CALIB_AWB_DS_4X4", "CALIB_AWB_DS_8X8"] }, "autoPara/blkMeasureMode": { e: ["CALIB_AWB_BLK_STAT_MODE_AL_V201", "CALIB_AWB_BLK_STAT_MODE_WP_V201"] }, "autoPara/mainWindow/window": { r: [0, 100], s: 0.01, a: true }, "autoPara/rgb2TcsPara/pseudoLuminanceWeight": { r: [0, 1], s: 1e-6, a: true }, "autoPara/rgb2TcsPara/rotationMat": { r: [0, 1], s: 1e-6, a: true }, "autoPara/rgb2RotationYuvMat": { r: [-255, 255], s: 1e-6, a: true }, "autoPara/extraWpRange/#/domain": { e: ["CALIB_AWB_EXTRA_RANGE_DOMAIN_UV", "CALIB_AWB_EXTRA_RANGE_DOMAIN_XY"], a: true }, "autoPara/extraWpRange/#/mode": { e: ["CALIB_AWB_EXCLUDE_WP_MODE", "CALIB_AWB_ETR_LIGHT_SOUR_MODE"] }, "autoPara/extraWpRange/#/region": { r: [-8192, 8191], s: 1, a: true }, "autoPara/wpDiffLumaWeight/enable": { b: 1 }, "autoPara/wpDiffLumaWeight/wpDiffWeiEnableTh/wpDiffWeiNoTh": { r: [0, 1], s: 9999999999999999e-20 }, "autoPara/wpDiffLumaWeight/wpDiffWeightLvSet/#/LvValue": { r: [0, 255e3], s: 1 }, "autoPara/wpDiffLumaWeight/wpDiffWeightLvSet/#/ratioSet/#/ratioValue": { r: [0, 1], s: 9999999999999999e-20 }, "autoPara/wpDiffLumaWeight/wpDiffWeightLvSet/#/ratioSet/#/weight": { r: [0, 1], s: 9999999999999999e-20, a: true }, "autoPara/wpDiffBlkWeiEnable": { b: 1 }, "autoPara/lightSources/#/name": { r: [0, 32], a: true }, "autoPara/lightSources/#/doorType": { e: ["CALIB_AWB_DOOR_TYPE_INDOOR", "CALIB_AWB_DOOR_TYPE_AMBIGUITY", "CALIB_AWB_DOOR_TYPE_OUTDOOR"] }, "autoPara/lightSources/#/standardGainValue": { r: [0, 8], s: 9999999999999999e-20, a: true }, "autoPara/lightSources/#/uvRegion/u": { r: [0, 255], s: 0.1, a: true }, "autoPara/lightSources/#/uvRegion/v": { r: [0, 255], s: 0.1, a: true }, "autoPara/lightSources/#/xyRegion/normal": { r: [-8, 8], s: 9999999999999999e-20, a: true }, "autoPara/lightSources/#/xyRegion/big": { r: [-8, 8], s: 9999999999999999e-20, a: true }, "autoPara/lightSources/#/rtYuvRegion/thcurve_u": { r: [0, 255], s: 1, a: true }, "autoPara/lightSources/#/rtYuvRegion/thcure_th": { r: [0, 8], s: 9999999999999999e-20, a: true }, "autoPara/lightSources/#/rtYuvRegion/lineVector": { r: [0, 255], s: 9999999999999999e-20, a: true }, "autoPara/lightSources/#/defaultDayGainLow": { r: [0, 8], s: 9999999999999999e-20, a: true }, "autoPara/lightSources/#/defaultDayGainHigh": { r: [0, 8], s: 9999999999999999e-20, a: true }, "autoPara/lightSources/#/weight/lumaValue": { r: [0, 255e3], s: 0.1, a: true }, "autoPara/lightSources/#/weight/weight": { r: [0, 5], s: 9999999999999999e-20, a: true }, "autoExtPara/smartRun/enable": { b: 1 }, "autoExtPara/tolerance/lumaValue": { r: [0, 255e3], s: 1, a: true }, "autoExtPara/tolerance/toleranceValue": { r: [0, 1], s: 9999999999999999e-20, a: true }, "autoExtPara/dampFactor/dFStep": { r: [0, 1], s: 9999999999999999e-20 }, "autoExtPara/dampFactor/dFMin": { r: [0, 1], s: 9999999999999999e-20 }, "autoExtPara/dampFactor/dFMax": { r: [0, 1], s: 9999999999999999e-20 }, "autoExtPara/dampFactor/lvIIRsize": { r: [0, 128], s: 1 }, "autoExtPara/dampFactor/lvVarTh": { r: [0, 100], s: 9999999999999999e-20 }, "autoExtPara/wbGainAdjust/enable": { b: 1 }, "autoExtPara/wbGainDaylightClip/enable": { b: 1 }, "autoExtPara/wbGainDaylightClip/outdoor_cct_min": { r: [0, 1e4], s: 1 }, "autoExtPara/wbGainClip/enable": { b: 1 }, "autoExtPara/wbGainClip/cct": { r: [0, 1e4], s: 1, a: true }, "autoExtPara/wbGainClip/cri_bound_up": { r: [0, 1], s: 9999999999999999e-20, a: true }, "autoExtPara/wbGainClip/cri_bound_low": { r: [0, 1], s: 9999999999999999e-20, a: true }, "autoExtPara/defaultNightGain": { r: [0, 8], s: 9999999999999999e-20, a: true }, "autoExtPara/probCalcDis/proDis_THH": { r: [0, 8], s: 9999999999999999e-20 }, "autoExtPara/probCalcDis/proDis_THL": { r: [0, 8], s: 9999999999999999e-20 }, "autoExtPara/probCalcWp/wpNumPercTh": { r: [0, 1], s: 1e-6 }, "autoExtPara/probCalcWp/wpNumPercTh2": { r: [0, 1], s: 1e-6 }, "autoExtPara/converged/varThforUnDamp": { r: [0, 1], s: 9999999999999999e-20 }, "autoExtPara/converged/varThforDamp": { r: [0, 1], s: 9999999999999999e-20 }, "autoExtPara/xyRegionStableSelection/enable": { b: 1 }, "autoExtPara/xyRegionStableSelection/xyTypeListSize": { r: [0, 65535], s: 1 }, "autoExtPara/xyRegionStableSelection/varianceLumaTh": { r: [0, 100], s: 9999999999999999e-20 }, "autoExtPara/singleColorProces/enable": { b: 1 }, "autoExtPara/singleColorProces/mode": { e: ["AWB_SGC_CALL_INITIAL", "AWB_SGC_CALL_AUTO", "AWB_SGC_CALL_ALWAYS"] }, "autoExtPara/singleColorProces/alpha": { r: [0, 1], s: 9999999999999999e-20 }, "autoExtPara/singleColorProces/wgtClrGradX": { r: [0, 1e4], s: 1, a: true }, "autoExtPara/singleColorProces/wgtClrGradY": { r: [0, 1], s: 9999999999999999e-20, a: true }, "autoExtPara/singleColorProces/wgtDisX": { r: [0, 1e4], s: 1, a: true }, "autoExtPara/singleColorProces/wgtDisCt": { r: [0, 1e4], s: 1, a: true }, "autoExtPara/singleColorProces/wgtDisHCtY": { r: [0, 1], s: 9999999999999999e-20, a: true }, "autoExtPara/singleColorProces/wgtDisMCtY": { r: [0, 1], s: 9999999999999999e-20, a: true }, "autoExtPara/singleColorProces/wgtDisLCtY": { r: [0, 1], s: 9999999999999999e-20, a: true }, "autoExtPara/singleColorProces/wgtLvX": { r: [0, 255e3], s: 1, a: true }, "autoExtPara/singleColorProces/wgtLvY": { r: [0, 1], s: 9999999999999999e-20, a: true }, "autoExtPara/singleColorProces/wgtWpNumthX": { r: [0, 1e5], s: 1, a: true }, "autoExtPara/singleColorProces/wgtWpNumthY": { r: [0, 1], s: 9999999999999999e-20, a: true }, "autoExtPara/singleColorProces/illuMchPrt": { r: [-1, 255], s: 1 }, "autoExtPara/singleColorProces/useSgcResth": { r: [0, 1], s: 9999999999999999e-20 }, "autoExtPara/singleColorProces/updateDpWbgnTh": { r: [0, 1e5], s: 1 }, "autoExtPara/singleColorProces/updateDpWbgnTh2": { r: [0, 1], s: 9999999999999999e-20 }, "autoExtPara/singleColorProces/updateEstWbgnTh": { r: [0, 1e5], s: 1 }, "autoExtPara/lineRgBg": { r: [-2147483648, 2147483647], s: 1e-6, a: true }, "autoExtPara/lineRgProjCCT": { r: [-2147483648, 2147483647], s: 1e-6, a: true }, "autoExtPara/chrAdpttAdj/enable": { b: 1 }, "autoExtPara/chrAdpttAdj/targetGain": { r: [0, 8], s: 9999999999999999e-20, a: true }, "autoExtPara/chrAdpttAdj/laCalcFactor": { r: [0, 255], s: 9999999999999999e-20 }, "autoExtPara/remosaicCfg/enable": { b: 1 }, "autoExtPara/remosaicCfg/applyInvWbGainEnable": { b: 1 }, "autoExtPara/remosaicCfg/sensorWbGain": { r: [0, 4], s: 9999999999999999e-20, a: true }, "autoExtPara/wbGainOffset/enable": { b: 1 }, "autoExtPara/wbGainOffset/offset": { r: [-8, 8], s: 9999999999999999e-20, a: true } }, ccm_calib: { "control/enable": { b: 1 }, "lumaCCM/gain_yalp_curve/#/iso": { r: [50, 204800], s: 1 }, "lumaCCM/gain_alphaScale_curve/gain": { r: [0, 4096], s: 1, a: true }, "lumaCCM/gain_alphaScale_curve/scale": { r: [0, 1], s: 0.01, a: true }, "TuningPara/illu_estim/weightRB": { r: [0, 3], s: 9999999999999999e-20, a: true }, "TuningPara/aCcmCof/#/name": { r: [0, 20], a: true }, "TuningPara/aCcmCof/#/awbGain": { r: [0, 5], s: 9999999999999999e-20, a: true }, "TuningPara/aCcmCof/#/minDist": { r: [0, 4], s: 9999999999999999e-20 }, "TuningPara/aCcmCof/#/gain_sat_curve/gains": { r: [0, 4096], s: 1, a: true }, "TuningPara/aCcmCof/#/gain_sat_curve/sat": { r: [0, 100], s: 0.1, a: true }, "TuningPara/matrixAll/#/name": { r: [0, 25], a: true }, "TuningPara/matrixAll/#/illumination": { r: [0, 20], a: true }, "TuningPara/matrixAll/#/saturation": { r: [0, 100], s: 0.1 }, "TuningPara/matrixAll/#/ccMatrix": { r: [-8, 7.992], s: 9999999999999999e-20, a: true }, "TuningPara/matrixAll/#/ccOffsets": { r: [-4095, 4095], s: 0.1, a: true } }, agamma_calib_v11: { "GammaTuningPara/Gamma_en": { b: 1 }, "GammaTuningPara/Gamma_out_segnum": { e: ["GAMMATYPE_LOG", "GAMMATYPE_EQU"] }, "GammaTuningPara/Gamma_out_offset": { r: [0, 4095], s: 1 }, "GammaTuningPara/Gamma_curve": { r: [0, 4095], s: 1, a: true } } };
  }
});

// webui/js/util.js
var require_util = __commonJS({
  "webui/js/util.js"(exports2, module2) {
    "use strict";
    init_define_IQ_SCHEMA();
    var fs2 = require("fs");
    var os = require("os");
    var path2 = require("path");
    var { execFileSync } = require("child_process");
    var sleep2 = (ms) => new Promise((r) => setTimeout(r, ms));
    function resolveAlias(alias) {
      const out = execFileSync(
        "ssh",
        ["-G", alias],
        { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
      );
      const cfg = {};
      for (const ln of out.split("\n")) {
        const [k, ...v] = ln.trim().split(" ");
        if (k && !cfg[k]) cfg[k] = v.join(" ");
      }
      return cfg;
    }
    function connectRaw(opts) {
      let Client;
      try {
        Client = require("ssh2").Client;
      } catch {
        throw Error("ssh2 not installed \u2014 run npm install in webui/js (or use --native on device)");
      }
      return new Promise((resolve, reject) => {
        const conn = new Client();
        conn.on("ready", () => resolve(conn)).on("error", reject).connect({ ...opts, readyTimeout: 8e3 });
      });
    }
    function connectBoard2(alias) {
      const cfg = resolveAlias(alias);
      const keys = (cfg.identityfile || "~/.ssh/id_rsa").split(",").map((p) => p.replace(/^~/, os.homedir())).filter((p) => {
        try {
          return fs2.statSync(p).isFile();
        } catch {
          return false;
        }
      });
      return connectRaw({
        host: cfg.hostname || alias,
        port: parseInt(cfg.port || "22"),
        username: cfg.user || os.userInfo().username,
        privateKey: keys.length ? fs2.readFileSync(keys[0]) : void 0
      });
    }
    function connectDirect2({ host, port: port2 = 22, user, password }) {
      return connectRaw({ host, port: parseInt(port2), username: user, password });
    }
    function execOnce2(conn, cmd, timeoutMs = 5e3) {
      return new Promise((resolve, reject) => {
        conn.exec(cmd, (err, chan) => {
          if (err) return reject(err);
          let out = "";
          const t = setTimeout(() => {
            chan.close();
            reject(new Error("exec timeout"));
          }, timeoutMs);
          chan.on("data", (d) => {
            out += d.toString();
          });
          chan.on("close", () => {
            clearTimeout(t);
            resolve(out);
          });
          chan.stderr.on("data", (d) => {
            out += d.toString();
          });
        });
      });
    }
    function sshHosts2() {
      const out = [];
      try {
        const txt = fs2.readFileSync(path2.join(os.homedir(), ".ssh", "config"), "utf8");
        for (const ln of txt.split("\n")) {
          const m = ln.match(/^\s*Host\s+(.+)$/i);
          if (!m) continue;
          for (const h of m[1].split(/\s+/))
            if (!/[*?]/.test(h)) out.push(h);
        }
      } catch {
      }
      return [...new Set(out)].sort();
    }
    module2.exports = { sleep: sleep2, connectBoard: connectBoard2, connectDirect: connectDirect2, execOnce: execOnce2, sshHosts: sshHosts2 };
  }
});

// webui/js/decode.js
var require_decode = __commonJS({
  "webui/js/decode.js"(exports2, module2) {
    "use strict";
    init_define_IQ_SCHEMA();
    var RAW_HALF = {
      RG10: [2, 2, 0],
      BG10: [2, 2, 1],
      GB10: [2, 2, 2],
      BA10: [2, 2, 3],
      RG12: [2, 4, 0],
      BG12: [2, 4, 1],
      GB12: [2, 4, 2],
      BA12: [2, 4, 3],
      RGGB: [1, 0, 0],
      BA81: [1, 0, 1],
      GBRG: [1, 0, 2],
      GRBG: [1, 0, 3]
    };
    function rawBytesPerSample2(id) {
      const f = RAW_HALF[String(id).replace(/U$/, "")];
      return f ? f[0] : 0;
    }
    function rawHalf2(srcBuf, id, w, h, stride, out) {
      const F = RAW_HALF[String(id).replace(/U$/, "")];
      if (!F) throw Error(`unsupported raw format ${id}`);
      const [B, sh, ord] = F;
      const qw = w >> 1, qh = h >> 1;
      let p = 0;
      if (B === 2) {
        const u16 = new Uint16Array(srcBuf.buffer, srcBuf.byteOffset, srcBuf.byteLength >> 1);
        const spw = stride >> 1;
        for (let y = 0; y < qh; y++) {
          const r0 = y * 2 * spw, r1 = r0 + spw;
          for (let x = 0; x < qw; x++, p += 3) {
            const c = x * 2;
            const c00 = u16[r0 + c], c01 = u16[r0 + c + 1], c10 = u16[r1 + c], c11 = u16[r1 + c + 1];
            let R, G, Bl;
            switch (ord) {
              case 0:
                R = c00 >> sh;
                G = c01 + c10 >> sh + 1;
                Bl = c11 >> sh;
                break;
              // RGGB
              case 1:
                R = c11 >> sh;
                G = c01 + c10 >> sh + 1;
                Bl = c00 >> sh;
                break;
              // BGGR
              case 2:
                R = c10 >> sh;
                G = c00 + c11 >> sh + 1;
                Bl = c01 >> sh;
                break;
              // GBRG
              default:
                R = c01 >> sh;
                G = c00 + c11 >> sh + 1;
                Bl = c10 >> sh;
            }
            out[p] = R;
            out[p + 1] = G;
            out[p + 2] = Bl;
          }
        }
      } else {
        for (let y = 0; y < qh; y++) {
          const r0 = y * 2 * stride, r1 = r0 + stride;
          for (let x = 0; x < qw; x++, p += 3) {
            const c = x * 2;
            const c00 = srcBuf[r0 + c], c01 = srcBuf[r0 + c + 1], c10 = srcBuf[r1 + c], c11 = srcBuf[r1 + c + 1];
            let R, G, Bl;
            switch (ord) {
              case 0:
                R = c00;
                G = c01 + c10 >> 1;
                Bl = c11;
                break;
              case 1:
                R = c11;
                G = c01 + c10 >> 1;
                Bl = c00;
                break;
              case 2:
                R = c10;
                G = c00 + c11 >> 1;
                Bl = c01;
                break;
              default:
                R = c01;
                G = c00 + c11 >> 1;
                Bl = c10;
            }
            out[p] = R;
            out[p + 1] = G;
            out[p + 2] = Bl;
          }
        }
      }
      return out;
    }
    function nv12ToRgb2(srcBuf, w, h, stride, out) {
      const uvOff = stride * h;
      let p = 0;
      for (let y = 0; y < h; y++) {
        const yRow = y * stride, uvRow = uvOff + (y >> 1) * stride;
        for (let x = 0; x < w; x++, p += 3) {
          const Y = (srcBuf[yRow + x] - 16) * 255 / 219;
          const c0 = uvRow + (x >> 1 << 1);
          const U = (srcBuf[c0] - 16) * 255 / 224 - 128;
          const V = (srcBuf[c0 + 1] - 16) * 255 / 224 - 128;
          let r = Y + 1.402 * V, g = Y - 0.344136 * U - 0.714136 * V, b = Y + 1.772 * U;
          out[p] = r < 0 ? 0 : r > 255 ? 255 : r;
          out[p + 1] = g < 0 ? 0 : g > 255 ? 255 : g;
          out[p + 2] = b < 0 ? 0 : b > 255 ? 255 : b;
        }
      }
      return out;
    }
    module2.exports = { rawHalf: rawHalf2, rawBytesPerSample: rawBytesPerSample2, nv12ToRgb: nv12ToRgb2 };
  }
});

// webui/js/ssh-source.js
var require_ssh_source = __commonJS({
  "webui/js/ssh-source.js"(exports2, module2) {
    "use strict";
    init_define_IQ_SCHEMA();
    var { sleep: sleep2 } = require_util();
    var SshRawSource2 = class {
      // openChannel: async () => Readable(板端裸字节流); h/fmt 仅构造期消费(帧长推算), 不留存
      constructor({ h, fmt = "RG10U", stride, frameBytes, openChannel }) {
        this.openChannel = openChannel;
        if (!/^(?:(?:RG|BA|GB|BG)(?:10|12)U|RGGB|GRBG|GBRG|BA81|NV12)$/.test(fmt)) throw new Error(`unsupported format ${fmt}`);
        if (!stride) throw new Error("stride required (probeBpl measured BpL)");
        this.stride = stride;
        this.frameBytes = frameBytes || (fmt === "NV12" ? stride * h * 3 >> 1 : stride * h);
        this.paused = false;
        this.stopped = false;
        this._backoff = 1.5;
        this._chan = null;
        this.frameCount = 0;
      }
      pause() {
        this.paused = true;
        this._closeChan();
      }
      // 主动停流(subdev 写的安全窗口), 不自动重启
      resume() {
        this.paused = false;
      }
      stop() {
        this.stopped = true;
        this._closeChan();
      }
      // 会话退役
      _closeChan() {
        if (this._chan) {
          try {
            this._chan.destroy();
          } catch {
          }
          this._chan = null;
        }
      }
      async *frames(log = () => {
      }) {
        while (!this.stopped) {
          while (this.paused && !this.stopped) {
            await sleep2(300);
            this._closeChan();
          }
          if (this.stopped) return;
          try {
            yield* this._session(log);
          } catch (e) {
            log(`[src] ${e.message}`);
          }
          if (this.stopped) return;
          if (!this.paused) log(`[src] stream ended (${this.frameCount} frames so far), retry in ${this._backoff}s`);
          await sleep2(this._backoff * 1e3);
          this._backoff = Math.min(this._backoff * 2, 10);
        }
      }
      async *_session(log) {
        const chan = await this.openChannel();
        this._chan = chan;
        chan.stderr?.on?.("data", (d) => log(`[board stderr] ${d.toString().trim().slice(-160)}`));
        let pending = null;
        let lastData = Date.now();
        const wd = setInterval(() => {
          if (Date.now() - lastData > 12e3) chan.destroy();
        }, 1e3);
        chan.on?.("data", () => {
          lastData = Date.now();
        });
        try {
          for await (const chunk of chan) {
            lastData = Date.now();
            pending = pending ? Buffer.concat([pending, chunk]) : chunk;
            while (pending.length >= this.frameBytes) {
              const n = Math.floor(pending.length / this.frameBytes);
              if (n > 1) pending = pending.subarray((n - 1) * this.frameBytes);
              this._backoff = 1.5;
              this.frameCount++;
              yield pending.subarray(0, this.frameBytes);
              pending = pending.subarray(this.frameBytes);
            }
            if (pending && pending.length > 64 << 20) pending = pending.subarray(-this.frameBytes);
          }
        } finally {
          clearInterval(wd);
          this._closeChan();
        }
      }
    };
    function ssh2Channel2(conn, dev, w, h, fmt) {
      const isp = fmt === "NV12";
      const fourcc = fmt.replace(/U$/, "");
      const cmd = `v4l2-ctl -d ${dev} --set-fmt-video=width=${w},height=${h},pixelformat=${fourcc} >/dev/null 2>&1` + (isp ? "" : `; v4l2-ctl -d ${dev} --set-selection=target=crop,left=0,top=0,width=${w},height=${h} >/dev/null 2>&1`) + `; exec v4l2-ctl -d ${dev} --stream-mmap=4 --stream-count=10000000 --stream-poll --stream-to=-`;
      return () => new Promise((resolve, reject) => {
        conn.exec(cmd, (err, chan) => err ? reject(err) : resolve(chan));
      });
    }
    module2.exports = { SshRawSource: SshRawSource2, ssh2Channel: ssh2Channel2 };
  }
});

// webui/js/native-conn.js
var require_native_conn = __commonJS({
  "webui/js/native-conn.js"(exports2, module2) {
    "use strict";
    init_define_IQ_SCHEMA();
    var { spawn } = require("child_process");
    var { PassThrough } = require("stream");
    var fs2 = require("fs");
    var net = require("net");
    var NativeConn2 = class {
      // 对齐 conn.exec(cmd, cb): cb(err, chan); chan 语义对齐 ssh2 channel ——
      //   stdout 纯净进 chan(拉流帧不混 stderr); chan.stderr 单独挂(execOnce 收全量各取所需);
      //   'close' = 进程退+stdio 全关(child 'close', ≈ ssh2 close); close()/destroy() → kill
      //   注: 刻意经 /bin/sh — 上层命令串(media/iq/board-info)依赖管道/glob/$() 且须与 ssh2 exec
      //   语义逐字等价; 输入均服务端校验(数值/板端回读), 信任模型与 ssh 路径相同。
      exec(cmd, cb) {
        const child = spawn("/bin/sh", ["-c", cmd], { stdio: ["ignore", "pipe", "pipe"], detached: true });
        const killGroup = () => {
          try {
            process.kill(-child.pid, "SIGKILL");
          } catch {
          }
        };
        const chan = new PassThrough();
        chan.stderr = child.stderr;
        chan.close = killGroup;
        chan.on("close", killGroup);
        child.stdout.pipe(chan, { end: false });
        child.on("close", () => chan.end());
        child.on("error", (e) => cb(e));
        cb(null, chan);
      }
      // 对齐 conn.sftp(cb): 本机文件直写(iq.js sftpWrite 唯一消费方)
      sftp(cb) {
        cb(null, {
          writeFile: (p, data, done) => fs2.writeFile(p, data, (e) => done(e || null)),
          end() {
          }
        });
      }
      // 对齐 conn.openssh_forwardOutStreamLocal(sock, cb): 板上无需 ssh 转发, net 直连 unix socket
      openssh_forwardOutStreamLocal(sockPath, cb) {
        const s = net.connect({ path: sockPath });
        let done = false;
        s.on("connect", () => {
          done = true;
          cb(null, s);
        });
        s.on("error", (e) => {
          try {
            s.destroy();
          } catch {
          }
          if (!done) {
            done = true;
            cb(Error(e.message));
          }
        });
      }
      end() {
      }
      // sessionDisconnect 收尾; 本机无连接可断(流通道各自 stop)
    };
    module2.exports = { NativeConn: NativeConn2 };
  }
});

// webui/js/board-info.js
var require_board_info = __commonJS({
  "webui/js/board-info.js"(exports2, module2) {
    "use strict";
    init_define_IQ_SCHEMA();
    var { execOnce: execOnce2, sleep: sleep2 } = require_util();
    var hrate = (b) => b >= 1048576 ? `${(b / 1048576).toFixed(1)}MB/s` : b >= 1024 ? `${(b / 1024).toFixed(0)}KB/s` : `${Math.round(b)}B/s`;
    async function boardInfoOnce2(conn) {
      const out = await execOnce2(
        conn,
        "date '+%T'; grep 'cpu ' /proc/stat; grep -E 'MemTotal|MemAvailable' /proc/meminfo; tail -n +3 /proc/net/dev; echo HN=$(hostname)"
      );
      const info = {};
      let cpuLine = null, ramT = 0, ramA = 0, netRx = 0, netTx = 0;
      for (const ln of out.split("\n").map((s) => s.trim())) {
        if (/^\d{1,2}:\d{2}:\d{2}$/.test(ln)) info.time = ln;
        else if (ln.startsWith("HN=") && ln.length > 3) info.hostname = ln.slice(3);
        else if (ln.startsWith("cpu ")) cpuLine = ln;
        else if (ln.startsWith("MemTotal:")) ramT = parseInt(ln.split(/\s+/)[1]);
        else if (ln.startsWith("MemAvailable:")) ramA = parseInt(ln.split(/\s+/)[1]);
        else if (/^[a-zA-Z0-9._-]+:/.test(ln) && !/^lo:/.test(ln)) {
          const f = ln.split(/:\s*/).pop().split(/\s+/).map(Number);
          if (f.length >= 16 && !isNaN(f[0])) {
            netRx += f[0];
            netTx += f[8];
          }
        }
      }
      if (netRx || netTx) info._net = [netRx, netTx];
      if (ramT && ramA) {
        const used = ramT - ramA;
        info.ram = `${(used / 1048576).toFixed(1)}/${(ramT / 1048576).toFixed(1)}G (${Math.floor(used * 100 / ramT)}%)`;
      }
      if (cpuLine) info._cpu = cpuLine.trim().split(/\s+/).slice(1).map(Number);
      return info;
    }
    async function boardInfoPoll2(conn, state, interval = 1, alive = () => true) {
      let prev = null, prevNet = null, prevT = 0;
      for (; ; ) {
        if (!alive()) return;
        const t = Date.now();
        try {
          const info = await boardInfoOnce2(conn);
          if (info.time) state.time = info.time;
          if (info.hostname) state.hostname = info.hostname;
          if (info.ram) state.ram = info.ram;
          if (info._cpu) {
            const cur = [info._cpu.reduce((a, b) => a + b, 0), info._cpu[3] + info._cpu[4]];
            if (prev) {
              const dt = cur[0] - prev[0], di = cur[1] - prev[1];
              if (dt > 0) state.cpu = `${Math.floor((dt - di) * 100 / dt)}%`;
            }
            prev = cur;
          }
          if (info._net) {
            const dt = (t - prevT) / 1e3;
            if (prevNet && dt > 0 && info._net[1] >= prevNet[1])
              state.net = `\u2191${hrate((info._net[1] - prevNet[1]) / dt)} \u2193${hrate((info._net[0] - prevNet[0]) / dt)}`;
            prevNet = info._net;
            prevT = t;
          }
        } catch (e) {
        }
        await sleep2(interval * 1e3);
      }
    }
    module2.exports = { boardInfoOnce: boardInfoOnce2, boardInfoPoll: boardInfoPoll2 };
  }
});

// webui/js/iq.js
var require_iq = __commonJS({
  "webui/js/iq.js"(exports2, module2) {
    "use strict";
    init_define_IQ_SCHEMA();
    var { execOnce: execOnce2 } = require_util();
    var sftpWrite2 = (conn, path2, data) => new Promise((res, rej) => conn.sftp((e, sftp) => e ? rej(e) : sftp.writeFile(path2, data, (err) => {
      try {
        sftp.end();
      } catch {
      }
      err ? rej(err) : res();
    })));
    var IQ_LOG_CMD = "{ journalctl -b 0 --no-pager 2>/dev/null; dmesg 2>/dev/null; logread 2>/dev/null;  tail -n 500 /var/log/messages 2>/dev/null; } | grep rk_aiq_uapi_sysctl_init | tail -1";
    async function probeIq2(conn) {
      const out = { files: [], loaded: null, note: null };
      const [ls, line] = await Promise.all([
        execOnce2(conn, "ls -1 /etc/iqfiles/ 2>/dev/null", 1e4),
        execOnce2(conn, IQ_LOG_CMD, 2e4)
      ]);
      out.files = ls.split("\n").map((x) => x.trim()).filter((x) => x && !/\.bak/.test(x));
      const m = line.match(/iq:\s*(\S+)/);
      if (!m) {
        out.note = "no load record in 3A log (rotated?)";
        return out;
      }
      out.loaded = m[1];
      if (!/\.json$/.test(out.loaded)) {
        out.note = "not a json IQ file (xml/bin?), name only";
        return out;
      }
      const raw = await execOnce2(conn, `cat ${out.loaded}`, 3e4);
      try {
        const j = JSON.parse(raw);
        out.raw = j;
        out.full = j;
        out.roots = {
          product_info: ["product_info"],
          module_calib: ["module_calib"],
          sys_static_cfg: ["sys_static_cfg"],
          sensor_calib: ["sensor_calib"],
          main_scene: ["main_scene"]
        };
        (j.main_scene || []).forEach((sc, i) => (sc.sub_scene || []).forEach((ss, k) => {
          const isp = Object.keys(ss).find((x) => /^scene_isp/.test(x));
          if (!isp) return;
          for (const m2 of Object.keys(ss[isp] || {}))
            out.roots[`${sc.name}/${m2}`] = ["main_scene", i, "sub_scene", k, isp, m2];
        }));
      } catch (e) {
        out.note = `json parse failed: ${e.message}`;
      }
      return out;
    }
    function nodeAt2(json2, roots, module3, path2) {
      let node = json2;
      for (const seg of roots[module3]) node = node[seg];
      for (let i = 0; i < path2.length - 1; i++) {
        node = node[path2[i]];
        if (node === void 0 || node === null) throw Error(`bad path ${path2.join(".")}`);
      }
      return node;
    }
    function applyPatches2(json2, roots, patches) {
      for (const p of patches) {
        if (!roots[p.module]) throw Error(`unknown module ${p.module}`);
        const node = nodeAt2(json2, roots, p.module, p.path);
        const leaf = p.path[p.path.length - 1];
        const orig = node[leaf];
        if (orig === void 0) throw Error(`no field ${p.path.join(".")}`);
        let v = p.value;
        if (typeof orig === "number" && typeof v !== "number") v = +v;
        if (typeof v === "number" && Number.isNaN(v))
          throw Error(`not a number at ${p.path.join(".")}`);
        if (Array.isArray(orig) !== Array.isArray(v) || !Array.isArray(orig) && typeof orig !== typeof v)
          throw Error(`type mismatch at ${p.path.join(".")}: want ${Array.isArray(orig) ? "array" : typeof orig}`);
        if (Array.isArray(orig) && orig.length !== v.length)
          throw Error(`array length changed at ${p.path.join(".")}: ${orig.length} vs ${v.length}`);
        node[leaf] = v;
      }
    }
    module2.exports = { probeIq: probeIq2, applyPatches: applyPatches2, nodeAt: nodeAt2, sftpWrite: sftpWrite2 };
  }
});

// webui/js/iq-schema.json
var require_iq_schema = __commonJS({
  "webui/js/iq-schema.json"(exports2, module2) {
    module2.exports = { _meta: { generated: "2026-10-19", source: "rkaiq include/iq_parser_v2 headers", hot_prefixes: ["ae_", "wb_", "ablc", "lut3d", "adegamma", "agic_", "debayer", "demosaic", "amerge", "merge", "adrc", "drc", "agamma", "gamma", "adehaze", "dehaze", "adpcc", "dpc", "aldch", "ldch", "cproc", "cp", "ie", "lsc", "bayernr", "bayer2dnr", "bayertnr", "ynr", "cnr", "sharp", "cac", "af_", "gain_", "csm", "cgc", "ccm_", "yuvme_", "argbir", "rgbir", "ldc"], enums: 77, structs: 858, fixed: { "sensor_calib/resolution": "mode resolution, must match sensor mode (datasheet)", "sensor_calib/Gain2Reg": "vendor gain\u2192register formula (datasheet; Sony = NONLINEAR_DB)", "sensor_calib/Time2Reg": "time\u2194line-count conversion (generic default, vendor: rarely changed)", "sensor_calib/CISGainSet": "again/dgain range (datasheet; wrong \u2192 wrong gain ceiling)", "sensor_calib/CISTimeSet": "exposure line timing (datasheet; wrong \u2192 underflow at low exposure)", "sensor_calib/CISHdrSet": "HDR frame mode = hardware capability (datasheet)", "sensor_calib/CISDcgSet": "DCG support = hardware capability (datasheet)", "sensor_calib/CISExpUpdate": "exposure update latency in frames (datasheet; wrong \u2192 exposure flicker)", "sensor_calib/CISHdrMultSet": "HDR multi-frame gain register layer (datasheet)", "sensor_calib/iso_list": "ISO step table (calibration companion)", "ae_calib/CommCtrl/HistStatsMode": "histogram stats channel (pipeline companion)", "ae_calib/CommCtrl/RawStatsMode": "RAW stats channel (pipeline companion)", "ae_calib/CommCtrl/YRangeMode": "Y range full/limited (matches sensor bit depth)", "ae_calib/CommCtrl/AecWinScale": "AE stats window (default full)", "ae_calib/CommCtrl/AecEnvLvCalib": "EnvLv calibration coefficient (calibration product)", "ae_calib/SyncTest": "sync test path (not a product feature)", "ae_calib/IrisCtrl": "iris control (module has no iris hardware)", "wb_v21/autoPara/rgb2TcsPara": "RGB\u2192TCS colorspace matrix (fixed math)", "wb_v21/autoPara/rgb2RotationYuvMat": "RGB\u2192YUV rotation matrix (fixed math)", "wb_v21/autoPara/mainWindow": "AWB stats window (default full)", "wb_v21/autoPara/downScaleMode": "stats downscale mode (pipeline companion)", "wb_v21/autoPara/blkMeasureMode": "block stats mode (pipeline companion)", "ccm_calib/TuningPara/matrixAll": "3x3 color matrix = calibration product (vendor: don't hand-edit; for color cast check AWB/BLC first)", "agamma_calib_v11/GammaTuningPara/Gamma_out_segnum": "curve interpolation type (structural choice)" } }, sensor_calib: { "resolution/width": { r: [0, 65535], s: 1 }, "resolution/height": { r: [0, 65535], s: 1 }, "Gain2Reg/GainMode": { e: ["EXPGAIN_MODE_LINEAR", "EXPGAIN_MODE_NONLINEAR_DB"] }, "Gain2Reg/GainRange_len": { r: [7, 70], s: 1 }, "Gain2Reg/GainRange": { r: [-65535, 65535], s: 9999999999999999e-20, a: true }, "Gain2Reg/GainRegDBUnit": { r: [0, 1], s: 9999999999999999e-20 }, "Time2Reg/fCoeff": { r: [-65535, 65535], s: 1e-6, a: true }, "CISGainSet/CISAgainRange/Min": { r: [0, 65535], s: 1e-3 }, "CISGainSet/CISAgainRange/Max": { r: [0, 65535], s: 1e-3 }, "CISGainSet/CISExtraAgainRange/Min": { r: [0, 65535], s: 1e-3 }, "CISGainSet/CISExtraAgainRange/Max": { r: [0, 65535], s: 1e-3 }, "CISGainSet/CISDgainRange/Min": { r: [0, 65535], s: 1e-3 }, "CISGainSet/CISDgainRange/Max": { r: [0, 65535], s: 1e-3 }, "CISGainSet/CISIspDgainRange/Min": { r: [0, 65535], s: 1e-3 }, "CISGainSet/CISIspDgainRange/Max": { r: [0, 65535], s: 1e-3 }, "CISGainSet/CISHdrGainIndSetEn": { b: 1 }, "CISTimeSet/Linear/CISLinTimeRegMaxFac/fCoeff": { r: [-65535, 65535], s: 1e-6, a: true }, "CISTimeSet/Linear/CISTimeRegOdevity/fCoeff": { r: [-65535, 65535], s: 1e-6, a: true }, "CISTimeSet/Linear/CISTimeLinePerReg": { r: [0, 100], s: 1e-3 }, "CISTimeSet/Linear/CISTimeOffsetUs": { r: [-65535, 65535], s: 1e-3 }, "CISTimeSet/Hdr/#/name": { e: ["HDR_TWO_FRAME", "HDR_THREE_FRAME"] }, "CISTimeSet/Hdr/#/CISTimeRegUnEqualEn": { b: 1 }, "CISTimeSet/Hdr/#/CISHdrTimeRegSumFac/fCoeff": { r: [-65535, 65535], s: 1e-6, a: true }, "CISTimeSet/Hdr/#/CISTimeRegOdevity/fCoeff": { r: [-65535, 65535], s: 1e-6, a: true }, "CISTimeSet/Hdr/#/CISTimeLinePerReg": { r: [0, 100], s: 1e-3 }, "CISTimeSet/Hdr/#/CISTimeOffsetUs/fCoeff": { r: [-65535, 65535], s: 1e-6, a: true }, "CISHdrSet/hdr_en": { b: 1 }, "CISHdrSet/hdr_mode": { e: ["RK_AIQ_ISP_HDR_MODE_2_FRAME_HDR", "RK_AIQ_ISP_HDR_MODE_2_LINE_HDR", "RK_AIQ_ISP_HDR_MODE_2_BUILTIN", "RK_AIQ_ISP_HDR_MODE_3_FRAME_HDR", "RK_AIQ_ISP_HDR_MODE_3_LINE_HDR", "RK_AIQ_ISP_HDR_MODE_3_BUILTIN"] }, "CISHdrSet/line_mode": { e: ["RKAIQ_SENSOR_HDR_MODE_STAGGER", "RKAIQ_SENSOR_HDR_MODE_DCG", "RKAIQ_SENSOR_HDR3_DCG_VS", "RKAIQ_SENSOR_HDR3_DCG_SPD", "RKAIQ_SENSOR_HDR3_STA", "RKAIQ_SENSOR_HDR3_DCG_LOFIC", "RKAIQ_SENSOR_HDR3_LCG_LOFIC_VS"] }, "CISDcgSet/Linear/support_en": { b: 1 }, "CISDcgSet/Linear/dcg_optype": { e: ["RK_AIQ_OP_MODE_AUTO", "RK_AIQ_OP_MODE_MANUAL"] }, "CISDcgSet/Linear/dcg_mode/Coeff": { r: [-65535, 65535], s: 1, a: true }, "CISDcgSet/Linear/dcg_ratio": { r: [1, 100], s: 0.01 }, "CISDcgSet/Linear/sync_switch": { b: 1 }, "CISDcgSet/Linear/lcg2hcg_gain_th": { r: [1, 4096], s: 0.01 }, "CISDcgSet/Linear/hcg2lcg_gain_th": { r: [1, 4096], s: 0.01 }, "CISDcgSet/Hdr/support_en": { b: 1 }, "CISDcgSet/Hdr/dcg_optype": { e: ["RK_AIQ_OP_MODE_AUTO", "RK_AIQ_OP_MODE_MANUAL"] }, "CISDcgSet/Hdr/dcg_mode/Coeff": { r: [-65535, 65535], s: 1, a: true }, "CISDcgSet/Hdr/dcg_ratio": { r: [1, 100], s: 0.01 }, "CISDcgSet/Hdr/sync_switch": { b: 1 }, "CISDcgSet/Hdr/lcg2hcg_gain_th": { r: [1, 4096], s: 0.01 }, "CISDcgSet/Hdr/hcg2lcg_gain_th": { r: [1, 4096], s: 0.01 }, "CISExpUpdate/Linear/time_update": { r: [0, 10], s: 1 }, "CISExpUpdate/Linear/gain_update": { r: [0, 10], s: 1 }, "CISExpUpdate/Linear/dcg_update": { r: [0, 10], s: 1 }, "CISExpUpdate/Hdr/time_update": { r: [0, 10], s: 1 }, "CISExpUpdate/Hdr/gain_update": { r: [0, 10], s: 1 }, "CISExpUpdate/Hdr/dcg_update": { r: [0, 10], s: 1 }, CISMinFps: { r: [1, 100], s: 0.01 }, CISFlip: { r: [0, 3], s: 1 }, iso_list: { r: [0, 2048e3], s: 0.1, a: true }, "CISHdrMultSet/#/ExpMode": { e: ["RKAIQ_SENSOR_HDR_MODE_STAGGER", "RKAIQ_SENSOR_HDR_MODE_DCG", "RKAIQ_SENSOR_HDR3_DCG_VS", "RKAIQ_SENSOR_HDR3_DCG_SPD", "RKAIQ_SENSOR_HDR3_STA", "RKAIQ_SENSOR_HDR3_DCG_LOFIC", "RKAIQ_SENSOR_HDR3_LCG_LOFIC_VS"] }, "CISHdrMultSet/#/CISFrmBit": { e: ["LFRM_USE_10BIT", "LFRM_USE_12BIT"] }, "CISHdrMultSet/#/CISGainSet/CISAgainRange/Min": { r: [0, 65535], s: 1e-3, a: true }, "CISHdrMultSet/#/CISGainSet/CISAgainRange/Max": { r: [0, 65535], s: 1e-3, a: true }, "CISHdrMultSet/#/CISGainSet/CISDgainRange/Min": { r: [0, 65535], s: 1e-3, a: true }, "CISHdrMultSet/#/CISGainSet/CISDgainRange/Max": { r: [0, 65535], s: 1e-3, a: true }, "CISHdrMultSet/#/CISGainSet/CISDcgMode/Coeff": { r: [-65535, 65535], s: 1, a: true }, "CISHdrMultSet/#/CISGainSet/CISDgainRegIndSetEn/Coeff": { r: [-65535, 65535], s: 1, a: true }, "CISHdrMultSet/#/CISGainSet/CISDGain2Reg/GainMode": { e: ["EXPGAIN_MODE_LINEAR", "EXPGAIN_MODE_NONLINEAR_DB"] }, "CISHdrMultSet/#/CISGainSet/CISDGain2Reg/GainRange_len": { r: [7, 70], s: 1 }, "CISHdrMultSet/#/CISGainSet/CISDGain2Reg/GainRange": { r: [-65535, 65535], s: 9999999999999999e-20, a: true }, "CISHdrMultSet/#/CISGainSet/CISDGain2Reg/GainRegDBUnit": { r: [0, 1], s: 9999999999999999e-20 }, "CISHdrMultSet/#/CISGainSet/CISHdrGainIndSetEn": { b: 1 }, "CISHdrMultSet/#/CISTimeSet/CISTimeRegUnEqualEn": { b: 1 }, "CISHdrMultSet/#/CISTimeSet/CISHdrTimeRegSumFac/fCoeff": { r: [-65535, 65535], s: 1e-6, a: true }, "CISHdrMultSet/#/CISTimeSet/CISTimeRegOdevity/fCoeff": { r: [-65535, 65535], s: 1e-6, a: true }, "CISHdrMultSet/#/CISTimeSet/CISTimeLinePerReg": { r: [0, 100], s: 1e-3 }, "CISHdrMultSet/#/CISTimeSet/CISTimeOffsetUs/fCoeff": { r: [-65535, 65535], s: 1e-6, a: true }, CISHdrMultSet_len: { r: [0, 10], s: 1 } }, ae_calib: { "CommCtrl/Enable": { b: 1 }, "CommCtrl/AecRunInterval": { r: [0, 255], s: 1 }, "CommCtrl/AecOpType": { e: ["RK_AIQ_OP_MODE_AUTO", "RK_AIQ_OP_MODE_MANUAL"] }, "CommCtrl/HistStatsMode": { e: ["CAM_HISTV2_MODE_RGB_COMBINED", "CAM_HISTV2_MODE_R", "CAM_HISTV2_MODE_G", "CAM_HISTV2_MODE_B", "CAM_HISTV2_MODE_Y"] }, "CommCtrl/RawStatsMode": { e: ["CAM_RAWSTATSV2_MODE_R", "CAM_RAWSTATSV2_MODE_G", "CAM_RAWSTATSV2_MODE_B", "CAM_RAWSTATSV2_MODE_Y"] }, "CommCtrl/YRangeMode": { e: ["CAM_YRANGEV2_MODE_FULL", "CAM_YRANGEV2_MODE_LIMITED"] }, "CommCtrl/AecGridWeight": { r: [0, 32], s: 1, a: true }, "CommCtrl/AecManualCtrl/LinearAE/ManualTimeEn": { b: 1 }, "CommCtrl/AecManualCtrl/LinearAE/ManualGainEn": { b: 1 }, "CommCtrl/AecManualCtrl/LinearAE/ManualIspDgainEn": { b: 1 }, "CommCtrl/AecManualCtrl/LinearAE/TimeValue": { r: [0, 1], s: 1e-6 }, "CommCtrl/AecManualCtrl/LinearAE/GainValue": { r: [1, 4096], s: 1e-3 }, "CommCtrl/AecManualCtrl/LinearAE/IspDGainValue": { r: [1, 4096], s: 1e-3 }, "CommCtrl/AecManualCtrl/HdrAE/ManualTimeEn": { b: 1 }, "CommCtrl/AecManualCtrl/HdrAE/ManualGainEn": { b: 1 }, "CommCtrl/AecManualCtrl/HdrAE/ManualIspDgainEn": { b: 1 }, "CommCtrl/AecManualCtrl/HdrAE/TimeValue": { r: [0, 1], s: 1e-6, a: true }, "CommCtrl/AecManualCtrl/HdrAE/GainValue": { r: [1, 4096], s: 1e-3, a: true }, "CommCtrl/AecManualCtrl/HdrAE/IspDGainValue": { r: [1, 4096], s: 1e-3, a: true }, "CommCtrl/AecSpeed/SmoothEn": { b: 1 }, "CommCtrl/AecSpeed/DampOver": { r: [0, 1], s: 0.01 }, "CommCtrl/AecSpeed/DampUnder": { r: [0, 1], s: 0.01 }, "CommCtrl/AecSpeed/DampDark2Bright": { r: [0, 1], s: 0.01 }, "CommCtrl/AecSpeed/DampBright2Dark": { r: [0, 1], s: 0.01 }, "CommCtrl/AecSpeed/DyDamp/DyDampEn": { b: 1 }, "CommCtrl/AecSpeed/DyDamp/SlowOPType": { e: ["RK_AIQ_OP_MODE_AUTO", "RK_AIQ_OP_MODE_MANUAL"] }, "CommCtrl/AecSpeed/DyDamp/SlowRange": { r: [0, 100], s: 0.01 }, "CommCtrl/AecSpeed/DyDamp/SlowDamp": { r: [0, 1], s: 0.01 }, "CommCtrl/AecDelay/DelayType": { e: ["DELAY_TYPE_FRAME", "DELAY_TYPE_TIME"] }, "CommCtrl/AecDelay/BlackDelay": { r: [0, 255], s: 1 }, "CommCtrl/AecDelay/WhiteDelay": { r: [0, 255], s: 1 }, "CommCtrl/AecFrameRateMode/isFpsFix": { b: 1 }, "CommCtrl/AecFrameRateMode/FpsValue": { r: [0, 1024], s: 0.1 }, "CommCtrl/AecAntiFlicker/enable": { b: 1 }, "CommCtrl/AecAntiFlicker/Frequency": { e: ["AECV2_FLICKER_FREQUENCY_OFF", "AECV2_FLICKER_FREQUENCY_50HZ", "AECV2_FLICKER_FREQUENCY_60HZ", "AECV2_FLICKER_FREQUENCY_AUTO"] }, "CommCtrl/AecAntiFlicker/Mode": { e: ["AECV2_ANTIFLICKER_AUTO_MODE", "AECV2_ANTIFLICKER_NORMAL_MODE"] }, "CommCtrl/AecEnvLvCalib/Enable": { b: 1 }, "CommCtrl/AecEnvLvCalib/CalibFNumber": { r: [0, 256], s: 0.01 }, "CommCtrl/AecEnvLvCalib/CurveCoeff": { r: [-1024, 1024], s: 9999999999999999e-21, a: true }, "CommCtrl/AecWinScale/InRawWinScale/h_offs": { r: [0, 1], s: 0.01 }, "CommCtrl/AecWinScale/InRawWinScale/v_offs": { r: [0, 1], s: 0.01 }, "CommCtrl/AecWinScale/InRawWinScale/h_size": { r: [0, 1], s: 0.01 }, "CommCtrl/AecWinScale/InRawWinScale/v_size": { r: [0, 1], s: 0.01 }, "CommCtrl/AecWinScale/TmoRawWinScale/h_offs": { r: [0, 1], s: 0.01 }, "CommCtrl/AecWinScale/TmoRawWinScale/v_offs": { r: [0, 1], s: 0.01 }, "CommCtrl/AecWinScale/TmoRawWinScale/h_size": { r: [0, 1], s: 0.01 }, "CommCtrl/AecWinScale/TmoRawWinScale/v_size": { r: [0, 1], s: 0.01 }, "CommCtrl/AecWinScale/YuvWinScale/h_offs": { r: [0, 1], s: 0.01 }, "CommCtrl/AecWinScale/YuvWinScale/v_offs": { r: [0, 1], s: 0.01 }, "CommCtrl/AecWinScale/YuvWinScale/h_size": { r: [0, 1], s: 0.01 }, "CommCtrl/AecWinScale/YuvWinScale/v_size": { r: [0, 1], s: 0.01 }, "LinearAeCtrl/RawStatsEn": { b: 1 }, "LinearAeCtrl/ToleranceIn": { r: [0, 100], s: 0.01 }, "LinearAeCtrl/ToleranceOut": { r: [0, 100], s: 0.01 }, "LinearAeCtrl/Evbias": { r: [-500, 500], s: 0.01 }, "LinearAeCtrl/StrategyMode": { e: ["AECV2_STRATEGY_MODE_LOWLIGHT", "AECV2_STRATEGY_MODE_HIGHLIGHT"] }, "LinearAeCtrl/InitExp/InitTimeValue": { r: [0, 1], s: 1e-6 }, "LinearAeCtrl/InitExp/InitGainValue": { r: [1, 4096], s: 1e-3 }, "LinearAeCtrl/InitExp/InitIspDGainValue": { r: [1, 4096], s: 1e-3 }, "LinearAeCtrl/InitExp/InitPIrisGainValue": { r: [1, 4096], s: 1 }, "LinearAeCtrl/InitExp/InitDCIrisDutyValue": { r: [0, 100], s: 1 }, "LinearAeCtrl/InitExp/InitHDCIrisTargetValue": { r: [0, 1023], s: 1 }, "LinearAeCtrl/Route/TimeDot": { r: [0, 1], s: 1e-6, a: true }, "LinearAeCtrl/Route/GainDot": { r: [1, 4096], s: 1e-3, a: true }, "LinearAeCtrl/Route/IspDGainDot": { r: [1, 4096], s: 1e-3, a: true }, "LinearAeCtrl/Route/PIrisDot": { r: [1, 4096], s: 1, a: true }, "LinearAeCtrl/DySetpoint/ExpLevel": { r: [0, 4096], s: 9999999999999999e-21, a: true }, "LinearAeCtrl/DySetpoint/DySetpoint": { r: [0, 255], s: 0.01, a: true }, "LinearAeCtrl/BackLightCtrl/Enable": { b: 1 }, "LinearAeCtrl/BackLightCtrl/StrBias": { r: [-500, 500], s: 0.01 }, "LinearAeCtrl/BackLightCtrl/MeasArea": { e: ["AECV2_MEASURE_AREA_AUTO", "AECV2_MEASURE_AREA_UP", "AECV2_MEASURE_AREA_BOTTOM", "AECV2_MEASURE_AREA_LEFT", "AECV2_MEASURE_AREA_RIGHT", "AECV2_MEASURE_AREA_CENTER"] }, "LinearAeCtrl/BackLightCtrl/OEROILowTh": { r: [0, 255], s: 0.01 }, "LinearAeCtrl/BackLightCtrl/LumaDistTh": { r: [0, 100], s: 0.01 }, "LinearAeCtrl/BackLightCtrl/LvLowTh": { r: [0, 100], s: 9999999999999999e-20 }, "LinearAeCtrl/BackLightCtrl/LvHighTh": { r: [0, 100], s: 9999999999999999e-20 }, "LinearAeCtrl/BackLightCtrl/BacklitSetPoint/ExpLevel": { r: [0, 4096], s: 9999999999999999e-21, a: true }, "LinearAeCtrl/BackLightCtrl/BacklitSetPoint/NonOEPdfTh": { r: [0, 1], s: 0.01, a: true }, "LinearAeCtrl/BackLightCtrl/BacklitSetPoint/LowLightPdfTh": { r: [0, 1], s: 0.01, a: true }, "LinearAeCtrl/BackLightCtrl/BacklitSetPoint/TargetLLLuma": { r: [0, 255], s: 0.01, a: true }, "LinearAeCtrl/OverExpCtrl/Enable": { b: 1 }, "LinearAeCtrl/OverExpCtrl/StrBias": { r: [-500, 500], s: 0.01 }, "LinearAeCtrl/OverExpCtrl/MaxWeight": { r: [0, 20], s: 0.01 }, "LinearAeCtrl/OverExpCtrl/HighLightTh": { r: [0, 255], s: 0.01 }, "LinearAeCtrl/OverExpCtrl/LowLightTh": { r: [0, 255], s: 0.01 }, "LinearAeCtrl/OverExpCtrl/OverExpSetPoint/OEpdf": { r: [0, 1], s: 0.01, a: true }, "LinearAeCtrl/OverExpCtrl/OverExpSetPoint/LowLightWeight": { r: [0, 20], s: 0.01, a: true }, "LinearAeCtrl/OverExpCtrl/OverExpSetPoint/HighLightWeight": { r: [0, 20], s: 0.01, a: true }, "HdrAeCtrl/ToleranceIn": { r: [0, 100], s: 0.01 }, "HdrAeCtrl/ToleranceOut": { r: [0, 100], s: 0.01 }, "HdrAeCtrl/Evbias": { r: [-500, 500], s: 1 }, "HdrAeCtrl/StrategyMode": { e: ["AECV2_STRATEGY_MODE_LOWLIGHT", "AECV2_STRATEGY_MODE_HIGHLIGHT"] }, "HdrAeCtrl/LumaDistTh": { r: [0, 100], s: 0.01 }, "HdrAeCtrl/InitExp/InitTimeValue": { r: [0, 1], s: 1e-6, a: true }, "HdrAeCtrl/InitExp/InitGainValue": { r: [1, 4096], s: 1e-3, a: true }, "HdrAeCtrl/InitExp/InitIspDGainValue": { r: [1, 4096], s: 1e-3, a: true }, "HdrAeCtrl/InitExp/InitPIrisGainValue": { r: [1, 4096], s: 1 }, "HdrAeCtrl/InitExp/InitDCIrisDutyValue": { r: [0, 100], s: 1 }, "HdrAeCtrl/InitExp/InitHDCIrisTargetValue": { r: [0, 1023], s: 1 }, "HdrAeCtrl/Route/Frm0TimeDot": { r: [0, 1], s: 1e-6, a: true }, "HdrAeCtrl/Route/Frm0GainDot": { r: [1, 4096], s: 1e-3, a: true }, "HdrAeCtrl/Route/Frm0IspDGainDot": { r: [1, 4096], s: 1e-3, a: true }, "HdrAeCtrl/Route/Frm1TimeDot": { r: [0, 1], s: 1e-6, a: true }, "HdrAeCtrl/Route/Frm1GainDot": { r: [1, 4096], s: 1e-3, a: true }, "HdrAeCtrl/Route/Frm1IspDGainDot": { r: [1, 4096], s: 1e-3, a: true }, "HdrAeCtrl/Route/Frm2TimeDot": { r: [0, 1], s: 1e-6, a: true }, "HdrAeCtrl/Route/Frm2GainDot": { r: [1, 4096], s: 1e-3, a: true }, "HdrAeCtrl/Route/Frm2IspDGainDot": { r: [1, 4096], s: 1e-3, a: true }, "HdrAeCtrl/Route/PIrisDot": { r: [1, 4096], s: 1, a: true }, "HdrAeCtrl/ExpRatioCtrl/ExpRatioType": { e: ["AECV2_HDR_RATIOTYPE_MODE_AUTO", "AECV2_HDR_RATIOTYPE_MODE_FIX"] }, "HdrAeCtrl/ExpRatioCtrl/ExpRatio/RatioExpDot": { r: [0, 1], s: 9999999999999999e-20, a: true }, "HdrAeCtrl/ExpRatioCtrl/ExpRatio/M2SRatioFix": { r: [1, 256], s: 0.01, a: true }, "HdrAeCtrl/ExpRatioCtrl/ExpRatio/L2MRatioFix": { r: [1, 256], s: 0.01, a: true }, "HdrAeCtrl/ExpRatioCtrl/ExpRatio/M2SRatioMax": { r: [1, 256], s: 0.01, a: true }, "HdrAeCtrl/ExpRatioCtrl/ExpRatio/L2MRatioMax": { r: [1, 256], s: 0.01, a: true }, "HdrAeCtrl/LongFrmMode/mode": { e: ["AECV2_HDR_LONGFRMMODE_DISABLE", "AECV2_HDR_LONGFRMMODE_AUTO", "AECV2_HDR_LONGFRMMODE_ENABLE"] }, "HdrAeCtrl/LongFrmMode/SfrmMinLine": { r: [0, 1024], s: 1 }, "HdrAeCtrl/LongFrmMode/LfrmModeExpTh": { r: [0, 100], s: 9999999999999999e-20 }, "HdrAeCtrl/LframeCtrl/OEROILowTh": { r: [0, 255], s: 0.01 }, "HdrAeCtrl/LframeCtrl/LvLowTh": { r: [0, 100], s: 9999999999999999e-20 }, "HdrAeCtrl/LframeCtrl/LvHighTh": { r: [0, 100], s: 9999999999999999e-20 }, "HdrAeCtrl/LframeCtrl/LfrmSetPoint/LExpLevel": { r: [0, 4096], s: 9999999999999999e-21, a: true }, "HdrAeCtrl/LframeCtrl/LfrmSetPoint/NonOEPdfTh": { r: [0, 1], s: 0.01, a: true }, "HdrAeCtrl/LframeCtrl/LfrmSetPoint/LowLightPdfTh": { r: [0, 1], s: 0.01, a: true }, "HdrAeCtrl/LframeCtrl/LfrmSetPoint/LSetPoint": { r: [0, 255], s: 0.01, a: true }, "HdrAeCtrl/LframeCtrl/LfrmSetPoint/TargetLLLuma": { r: [0, 255], s: 0.01, a: true }, "HdrAeCtrl/MframeCtrl/MExpLevel": { r: [0, 4096], s: 9999999999999999e-21, a: true }, "HdrAeCtrl/MframeCtrl/MSetPoint": { r: [0, 255], s: 0.01, a: true }, "HdrAeCtrl/SframeCtrl/HLROIExpandEn": { b: 1 }, "HdrAeCtrl/SframeCtrl/HLLumaTolerance": { r: [0, 100], s: 0.01 }, "HdrAeCtrl/SframeCtrl/SfrmSetPoint/SExpLevel": { r: [0, 4096], s: 1e-6, a: true }, "HdrAeCtrl/SframeCtrl/SfrmSetPoint/SSetPoint": { r: [0, 255], s: 0.01, a: true }, "HdrAeCtrl/SframeCtrl/SfrmSetPoint/TargetHLLuma": { r: [0, 255], s: 0.01, a: true }, "IrisCtrl/Enable": { b: 1 }, "IrisCtrl/IrisType": { e: ["IRISV2_DC_TYPE", "IRISV2_P_TYPE", "IRISV2_HDC_TYPE"] }, "IrisCtrl/ManualEn": { b: 1 }, "IrisCtrl/ManualAttr/PIrisGainValue": { r: [1, 4096], s: 1 }, "IrisCtrl/ManualAttr/DCIrisHoldValue": { r: [0, 100], s: 1 }, "IrisCtrl/ManualAttr/HDCIrisTargetValue": { r: [0, 1023], s: 1 }, "IrisCtrl/InitAttr/PIrisGainValue": { r: [1, 4096], s: 1 }, "IrisCtrl/InitAttr/DCIrisHoldValue": { r: [0, 100], s: 1 }, "IrisCtrl/InitAttr/HDCIrisTargetValue": { r: [0, 1023], s: 1 }, "IrisCtrl/PIrisAttr/TotalStep": { r: [0, 1024], s: 1 }, "IrisCtrl/PIrisAttr/EffcStep": { r: [0, 1024], s: 1 }, "IrisCtrl/PIrisAttr/ZeroIsMax": { b: 1 }, "IrisCtrl/PIrisAttr/StepTable": { r: [1, 4096], s: 1, a: true }, "IrisCtrl/DCIrisAttr/Kp": { r: [0, 10], s: 0.01 }, "IrisCtrl/DCIrisAttr/Ki": { r: [0, 10], s: 0.01 }, "IrisCtrl/DCIrisAttr/Kd": { r: [0, 10], s: 0.01 }, "IrisCtrl/DCIrisAttr/MinPwmDuty": { r: [0, 100], s: 1 }, "IrisCtrl/DCIrisAttr/MaxPwmDuty": { r: [0, 100], s: 1 }, "IrisCtrl/DCIrisAttr/OpenPwmDuty": { r: [0, 100], s: 1 }, "IrisCtrl/DCIrisAttr/ClosePwmDuty": { r: [0, 100], s: 1 }, "IrisCtrl/HDCIrisAttr/DampOver": { r: [0, 1], s: 0.01 }, "IrisCtrl/HDCIrisAttr/DampUnder": { r: [0, 1], s: 0.01 }, "IrisCtrl/HDCIrisAttr/ZeroIsMax": { b: 1 }, "IrisCtrl/HDCIrisAttr/MinTarget": { r: [0, 1023], s: 1 }, "IrisCtrl/HDCIrisAttr/MaxTarget": { r: [0, 1023], s: 1 }, "IrisCtrl/HDCIrisAttr/ZoomTargetDot": { r: [0, 1023], s: 1, a: true }, "IrisCtrl/HDCIrisAttr/ZoomDot": { r: [-32768, 32767], s: 1, a: true }, "IrisCtrl/HDCIrisAttr/GainDot": { r: [1, 512], s: 1, a: true }, "IrisCtrl/HDCIrisAttr/ZoomTargetDot_len": { r: [1, 256], s: 1 }, "IrisCtrl/HDCIrisAttr/IrisTargetDot_len": { r: [1, 256], s: 1 }, "SyncTest/Enable": { b: 1 }, "SyncTest/IntervalFrm": { r: [0, 1024], s: 1 }, "SyncTest/AlterExp/LinearAE/#/TimeValue": { r: [0, 1], s: 1e-6 }, "SyncTest/AlterExp/LinearAE/#/GainValue": { r: [1, 4096], s: 1e-3 }, "SyncTest/AlterExp/LinearAE/#/IspDGainValue": { r: [1, 4096], s: 1e-3 }, "SyncTest/AlterExp/LinearAE/#/PIrisGainValue": { r: [1, 4096], s: 1 }, "SyncTest/AlterExp/LinearAE/#/DcgMode": { r: [-1, 1], s: 1 }, "SyncTest/AlterExp/HdrAE/#/TimeValue": { r: [0, 1], s: 1e-6, a: true }, "SyncTest/AlterExp/HdrAE/#/GainValue": { r: [1, 4096], s: 1e-3, a: true }, "SyncTest/AlterExp/HdrAE/#/IspDGainValue": { r: [1, 4096], s: 1e-3, a: true }, "SyncTest/AlterExp/HdrAE/#/DcgMode": { r: [-1, 1], s: 1, a: true } }, ablc_calib: { "BlcTuningPara/enable": { b: 1 }, "BlcTuningPara/BLC_Data/ISO": { r: [0, 1e7], s: 9999999999999999e-20, a: true }, "BlcTuningPara/BLC_Data/R_Channel": { r: [0, 4095], s: 9999999999999999e-20, a: true }, "BlcTuningPara/BLC_Data/Gr_Channel": { r: [0, 4095], s: 9999999999999999e-20, a: true }, "BlcTuningPara/BLC_Data/Gb_Channel": { r: [0, 4095], s: 9999999999999999e-20, a: true }, "BlcTuningPara/BLC_Data/B_Channel": { r: [0, 4095], s: 9999999999999999e-20, a: true }, "Blc1TuningPara/enable": { b: 1 }, "Blc1TuningPara/BLC_Data/ISO": { r: [0, 1e7], s: 9999999999999999e-20, a: true }, "Blc1TuningPara/BLC_Data/R_Channel": { r: [0, 4095], s: 9999999999999999e-20, a: true }, "Blc1TuningPara/BLC_Data/Gr_Channel": { r: [0, 4095], s: 9999999999999999e-20, a: true }, "Blc1TuningPara/BLC_Data/Gb_Channel": { r: [0, 4095], s: 9999999999999999e-20, a: true }, "Blc1TuningPara/BLC_Data/B_Channel": { r: [0, 4095], s: 9999999999999999e-20, a: true } }, wb_v21: { "control/byPass": { b: 1 }, "control/mode": { e: ["CALIB_WB_MODE_MANUAL", "CALIB_WB_MODE_AUTO"] }, "manualPara/mode": { e: ["CALIB_MWB_MODE_CCT", "CALIB_MWB_MODE_WBGAIN", "CALIB_MWB_MODE_SCENE"] }, "manualPara/cfg/mwbGain": { r: [0, 8], s: 9999999999999999e-20, a: true }, "manualPara/cfg/scene": { e: ["CALIB_WB_SCENE_INCANDESCENT", "CALIB_WB_SCENE_FLUORESCENT", "CALIB_WB_SCENE_WARM_FLUORESCENT", "CALIB_WB_SCENE_DAYLIGHT", "CALIB_WB_SCENE_CLOUDY_DAYLIGHT", "CALIB_WB_SCENE_TWILIGHT", "CALIB_WB_SCENE_SHADE"] }, "manualPara/cfg/cct/CCT": { r: [0, 1e4], s: 1 }, "manualPara/cfg/cct/CCRI": { r: [-2, 2], s: 1e-3 }, "autoPara/hdrPara/frameChooseMode": { e: ["CALIB_AWB_HDR_FR_CH_MANUAL", "CALIB_AWB_HDR_FR_CH_AUTO"] }, "autoPara/lscBypassEnable": { b: 1 }, "autoPara/uvDetectionEnable": { b: 1 }, "autoPara/xyDetectionEnable": { b: 1 }, "autoPara/yuvDetectionEnable": { b: 1 }, "autoPara/blkStatisticsEnable": { b: 1 }, "autoPara/downScaleMode": { e: ["CALIB_AWB_DS_4X4", "CALIB_AWB_DS_8X8"] }, "autoPara/blkMeasureMode": { e: ["CALIB_AWB_BLK_STAT_MODE_AL_V201", "CALIB_AWB_BLK_STAT_MODE_WP_V201"] }, "autoPara/mainWindow/window": { r: [0, 100], s: 0.01, a: true }, "autoPara/rgb2TcsPara/pseudoLuminanceWeight": { r: [0, 1], s: 1e-6, a: true }, "autoPara/rgb2TcsPara/rotationMat": { r: [0, 1], s: 1e-6, a: true }, "autoPara/rgb2RotationYuvMat": { r: [-255, 255], s: 1e-6, a: true }, "autoPara/extraWpRange/#/domain": { e: ["CALIB_AWB_EXTRA_RANGE_DOMAIN_UV", "CALIB_AWB_EXTRA_RANGE_DOMAIN_XY"], a: true }, "autoPara/extraWpRange/#/mode": { e: ["CALIB_AWB_EXCLUDE_WP_MODE", "CALIB_AWB_ETR_LIGHT_SOUR_MODE"] }, "autoPara/extraWpRange/#/region": { r: [-8192, 8191], s: 1, a: true }, "autoPara/wpDiffLumaWeight/enable": { b: 1 }, "autoPara/wpDiffLumaWeight/wpDiffWeiEnableTh/wpDiffWeiNoTh": { r: [0, 1], s: 9999999999999999e-20 }, "autoPara/wpDiffLumaWeight/wpDiffWeightLvSet/#/LvValue": { r: [0, 255e3], s: 1 }, "autoPara/wpDiffLumaWeight/wpDiffWeightLvSet/#/ratioSet/#/ratioValue": { r: [0, 1], s: 9999999999999999e-20 }, "autoPara/wpDiffLumaWeight/wpDiffWeightLvSet/#/ratioSet/#/weight": { r: [0, 1], s: 9999999999999999e-20, a: true }, "autoPara/wpDiffBlkWeiEnable": { b: 1 }, "autoPara/lightSources/#/name": { r: [0, 32], a: true }, "autoPara/lightSources/#/doorType": { e: ["CALIB_AWB_DOOR_TYPE_INDOOR", "CALIB_AWB_DOOR_TYPE_AMBIGUITY", "CALIB_AWB_DOOR_TYPE_OUTDOOR"] }, "autoPara/lightSources/#/standardGainValue": { r: [0, 8], s: 9999999999999999e-20, a: true }, "autoPara/lightSources/#/uvRegion/u": { r: [0, 255], s: 0.1, a: true }, "autoPara/lightSources/#/uvRegion/v": { r: [0, 255], s: 0.1, a: true }, "autoPara/lightSources/#/xyRegion/normal": { r: [-8, 8], s: 9999999999999999e-20, a: true }, "autoPara/lightSources/#/xyRegion/big": { r: [-8, 8], s: 9999999999999999e-20, a: true }, "autoPara/lightSources/#/rtYuvRegion/thcurve_u": { r: [0, 255], s: 1, a: true }, "autoPara/lightSources/#/rtYuvRegion/thcure_th": { r: [0, 8], s: 9999999999999999e-20, a: true }, "autoPara/lightSources/#/rtYuvRegion/lineVector": { r: [0, 255], s: 9999999999999999e-20, a: true }, "autoPara/lightSources/#/defaultDayGainLow": { r: [0, 8], s: 9999999999999999e-20, a: true }, "autoPara/lightSources/#/defaultDayGainHigh": { r: [0, 8], s: 9999999999999999e-20, a: true }, "autoPara/lightSources/#/weight/lumaValue": { r: [0, 255e3], s: 0.1, a: true }, "autoPara/lightSources/#/weight/weight": { r: [0, 5], s: 9999999999999999e-20, a: true }, "autoExtPara/smartRun/enable": { b: 1 }, "autoExtPara/tolerance/lumaValue": { r: [0, 255e3], s: 1, a: true }, "autoExtPara/tolerance/toleranceValue": { r: [0, 1], s: 9999999999999999e-20, a: true }, "autoExtPara/dampFactor/dFStep": { r: [0, 1], s: 9999999999999999e-20 }, "autoExtPara/dampFactor/dFMin": { r: [0, 1], s: 9999999999999999e-20 }, "autoExtPara/dampFactor/dFMax": { r: [0, 1], s: 9999999999999999e-20 }, "autoExtPara/dampFactor/lvIIRsize": { r: [0, 128], s: 1 }, "autoExtPara/dampFactor/lvVarTh": { r: [0, 100], s: 9999999999999999e-20 }, "autoExtPara/wbGainAdjust/enable": { b: 1 }, "autoExtPara/wbGainDaylightClip/enable": { b: 1 }, "autoExtPara/wbGainDaylightClip/outdoor_cct_min": { r: [0, 1e4], s: 1 }, "autoExtPara/wbGainClip/enable": { b: 1 }, "autoExtPara/wbGainClip/cct": { r: [0, 1e4], s: 1, a: true }, "autoExtPara/wbGainClip/cri_bound_up": { r: [0, 1], s: 9999999999999999e-20, a: true }, "autoExtPara/wbGainClip/cri_bound_low": { r: [0, 1], s: 9999999999999999e-20, a: true }, "autoExtPara/defaultNightGain": { r: [0, 8], s: 9999999999999999e-20, a: true }, "autoExtPara/probCalcDis/proDis_THH": { r: [0, 8], s: 9999999999999999e-20 }, "autoExtPara/probCalcDis/proDis_THL": { r: [0, 8], s: 9999999999999999e-20 }, "autoExtPara/probCalcWp/wpNumPercTh": { r: [0, 1], s: 1e-6 }, "autoExtPara/probCalcWp/wpNumPercTh2": { r: [0, 1], s: 1e-6 }, "autoExtPara/converged/varThforUnDamp": { r: [0, 1], s: 9999999999999999e-20 }, "autoExtPara/converged/varThforDamp": { r: [0, 1], s: 9999999999999999e-20 }, "autoExtPara/xyRegionStableSelection/enable": { b: 1 }, "autoExtPara/xyRegionStableSelection/xyTypeListSize": { r: [0, 65535], s: 1 }, "autoExtPara/xyRegionStableSelection/varianceLumaTh": { r: [0, 100], s: 9999999999999999e-20 }, "autoExtPara/singleColorProces/enable": { b: 1 }, "autoExtPara/singleColorProces/mode": { e: ["AWB_SGC_CALL_INITIAL", "AWB_SGC_CALL_AUTO", "AWB_SGC_CALL_ALWAYS"] }, "autoExtPara/singleColorProces/alpha": { r: [0, 1], s: 9999999999999999e-20 }, "autoExtPara/singleColorProces/wgtClrGradX": { r: [0, 1e4], s: 1, a: true }, "autoExtPara/singleColorProces/wgtClrGradY": { r: [0, 1], s: 9999999999999999e-20, a: true }, "autoExtPara/singleColorProces/wgtDisX": { r: [0, 1e4], s: 1, a: true }, "autoExtPara/singleColorProces/wgtDisCt": { r: [0, 1e4], s: 1, a: true }, "autoExtPara/singleColorProces/wgtDisHCtY": { r: [0, 1], s: 9999999999999999e-20, a: true }, "autoExtPara/singleColorProces/wgtDisMCtY": { r: [0, 1], s: 9999999999999999e-20, a: true }, "autoExtPara/singleColorProces/wgtDisLCtY": { r: [0, 1], s: 9999999999999999e-20, a: true }, "autoExtPara/singleColorProces/wgtLvX": { r: [0, 255e3], s: 1, a: true }, "autoExtPara/singleColorProces/wgtLvY": { r: [0, 1], s: 9999999999999999e-20, a: true }, "autoExtPara/singleColorProces/wgtWpNumthX": { r: [0, 1e5], s: 1, a: true }, "autoExtPara/singleColorProces/wgtWpNumthY": { r: [0, 1], s: 9999999999999999e-20, a: true }, "autoExtPara/singleColorProces/illuMchPrt": { r: [-1, 255], s: 1 }, "autoExtPara/singleColorProces/useSgcResth": { r: [0, 1], s: 9999999999999999e-20 }, "autoExtPara/singleColorProces/updateDpWbgnTh": { r: [0, 1e5], s: 1 }, "autoExtPara/singleColorProces/updateDpWbgnTh2": { r: [0, 1], s: 9999999999999999e-20 }, "autoExtPara/singleColorProces/updateEstWbgnTh": { r: [0, 1e5], s: 1 }, "autoExtPara/lineRgBg": { r: [-2147483648, 2147483647], s: 1e-6, a: true }, "autoExtPara/lineRgProjCCT": { r: [-2147483648, 2147483647], s: 1e-6, a: true }, "autoExtPara/chrAdpttAdj/enable": { b: 1 }, "autoExtPara/chrAdpttAdj/targetGain": { r: [0, 8], s: 9999999999999999e-20, a: true }, "autoExtPara/chrAdpttAdj/laCalcFactor": { r: [0, 255], s: 9999999999999999e-20 }, "autoExtPara/remosaicCfg/enable": { b: 1 }, "autoExtPara/remosaicCfg/applyInvWbGainEnable": { b: 1 }, "autoExtPara/remosaicCfg/sensorWbGain": { r: [0, 4], s: 9999999999999999e-20, a: true }, "autoExtPara/wbGainOffset/enable": { b: 1 }, "autoExtPara/wbGainOffset/offset": { r: [-8, 8], s: 9999999999999999e-20, a: true } }, ccm_calib: { "control/enable": { b: 1 }, "lumaCCM/gain_yalp_curve/#/iso": { r: [50, 204800], s: 1 }, "lumaCCM/gain_alphaScale_curve/gain": { r: [0, 4096], s: 1, a: true }, "lumaCCM/gain_alphaScale_curve/scale": { r: [0, 1], s: 0.01, a: true }, "TuningPara/illu_estim/weightRB": { r: [0, 3], s: 9999999999999999e-20, a: true }, "TuningPara/aCcmCof/#/name": { r: [0, 20], a: true }, "TuningPara/aCcmCof/#/awbGain": { r: [0, 5], s: 9999999999999999e-20, a: true }, "TuningPara/aCcmCof/#/minDist": { r: [0, 4], s: 9999999999999999e-20 }, "TuningPara/aCcmCof/#/gain_sat_curve/gains": { r: [0, 4096], s: 1, a: true }, "TuningPara/aCcmCof/#/gain_sat_curve/sat": { r: [0, 100], s: 0.1, a: true }, "TuningPara/matrixAll/#/name": { r: [0, 25], a: true }, "TuningPara/matrixAll/#/illumination": { r: [0, 20], a: true }, "TuningPara/matrixAll/#/saturation": { r: [0, 100], s: 0.1 }, "TuningPara/matrixAll/#/ccMatrix": { r: [-8, 7.992], s: 9999999999999999e-20, a: true }, "TuningPara/matrixAll/#/ccOffsets": { r: [-4095, 4095], s: 0.1, a: true } }, agamma_calib_v11: { "GammaTuningPara/Gamma_en": { b: 1 }, "GammaTuningPara/Gamma_out_segnum": { e: ["GAMMATYPE_LOG", "GAMMATYPE_EQU"] }, "GammaTuningPara/Gamma_out_offset": { r: [0, 4095], s: 1 }, "GammaTuningPara/Gamma_curve": { r: [0, 4095], s: 1, a: true } } };
  }
});

// webui/js/media.js
var require_media = __commonJS({
  "webui/js/media.js"(exports2, module2) {
    "use strict";
    init_define_IQ_SCHEMA();
    var { execOnce: execOnce2, sleep: sleep2 } = require_util();
    var { rawBytesPerSample: rawBytesPerSample2 } = require_decode();
    async function enumVideoDevs2(conn) {
      const out = await execOnce2(conn, "v4l2-ctl --list-devices");
      const sec = [];
      let cur = null;
      for (const ln of out.split("\n").map((s) => s.trim())) {
        if (!ln) continue;
        const n = ln.match(/^(\/dev\/video\d+):?$/);
        if (n) {
          if (cur) cur.nodes.push(n[1]);
          continue;
        }
        cur = { name: ln.replace(/:$/, ""), nodes: [] };
        sec.push(cur);
      }
      return sec.filter((s) => s.nodes.length);
    }
    async function probeMedia2(conn) {
      const out = await execOnce2(
        conn,
        'for m in /dev/media*; do echo "== $m"; media-ctl -d $m -p 2>/dev/null | grep -E "^- entity|device node name"; done',
        2e4
      );
      const graphs = {};
      let cur = null;
      for (const ln of out.split("\n").map((s) => s.trim())) {
        const h = ln.match(/^== (\/dev\/media\d+)$/);
        if (h) {
          cur = graphs[h[1]] = { last: "", entities: [], nodes: {}, pads: {} };
          continue;
        }
        if (!cur) continue;
        const e = ln.match(/^- entity \d+: (.+?) \((\d+) pads?/);
        if (e) {
          cur.last = e[1];
          cur.entities.push(e[1]);
          cur.pads[e[1]] = +e[2];
          continue;
        }
        const n = ln.match(/^device node name (\/dev\/(?:video|v4l-subdev)\d+)$/);
        if (n && cur.last) cur.nodes[cur.last] = n[1];
      }
      const res = { cif: null, vcm: null };
      for (const g of Object.values(graphs)) {
        const sensor = g.entities.find((x) => /^m\d{2}_[fb]_/.test(x) && g.pads[x] >= 1);
        if (sensor && g.entities.some((x) => /^rkcif/.test(x)) && !res.cif) {
          res.cif = {
            media: Object.keys(graphs).find((k) => graphs[k] === g),
            sensor,
            sensorNode: g.nodes[sensor] || null
          };
          const vcmEnt = g.entities.find((x) => /^m\d{2}_f_/.test(x) && x !== sensor && g.nodes[x]);
          if (vcmEnt) res.vcm = { entity: vcmEnt, node: g.nodes[vcmEnt] };
        }
      }
      return res;
    }
    var cifMedia2 = (media) => media && media.cif && media.cif.media || "/dev/media0";
    async function sensorEntityOf2(conn, media) {
      const ent = await execOnce2(
        conn,
        `media-ctl -d ${cifMedia2(media)} -p 2>/dev/null | grep -oE 'm[0-9]{2}_f_[a-zA-Z0-9_]+ [0-9]+-[0-9a-f]+' | head -1`
      );
      return ent.trim() || null;
    }
    async function probeFormats2(conn, devs) {
      const s = devs.find((x) => /rkcif/.test(x.name) && x.nodes.length);
      if (!s) return null;
      const fmts = await execOnce2(conn, `v4l2-ctl -d ${s.nodes[0]} --list-formats`);
      let fourcc = null;
      for (const re of [/'((?:RG|BA|GB|BG)12)'/, /'((?:RG|BA|GB|BG)10)'/, /'((?:RGGB|GRBG|GBRG|BA81))'/]) {
        const m = fmts.match(re);
        if (m) {
          fourcc = m[1];
          break;
        }
      }
      if (!fourcc) return null;
      return { id: /(?:10|12)$/.test(fourcc) ? `${fourcc}U` : fourcc, dev: s.nodes[0], w: 0, h: 0 };
    }
    async function probeIspFmt2(conn, devs) {
      const s = devs.find((x) => /rkisp_mainpath/.test(x.name) && x.nodes.length);
      if (!s) return null;
      const fmts = await execOnce2(conn, `v4l2-ctl -d ${s.nodes[0]} --list-formats`);
      return /'NV12'/.test(fmts) ? { id: "NV12", dev: s.nodes[0], w: 0, h: 0 } : null;
    }
    async function probeModes2(conn, media) {
      const subdev = media?.cif?.sensorNode || "/dev/v4l-subdev2";
      const fsz = await execOnce2(
        conn,
        `v4l2-ctl -d ${subdev} --list-subdev-framesizes=pad=0,code=0x300f 2>&1 | grep 'Size Range'`,
        15e3
      );
      const seen = /* @__PURE__ */ new Map();
      for (const ln of fsz.split("\n")) {
        const m = ln.match(/Size Range:\s*(\d+)x(\d+)\s*-\s*(\d+)x(\d+)/);
        if (!m || m[1] !== m[3] || m[2] !== m[4]) continue;
        const w = +m[1], h = +m[2], size = `${w}x${h}`;
        if (!seen.has(size)) seen.set(size, { size, w, h });
      }
      return [...seen.values()].sort((a, b) => a.w * a.h - b.w * b.h);
    }
    async function ensureUnpacked2(conn) {
      await execOnce2(
        conn,
        'P=$(ls /sys/devices/platform/*/compact_test 2>/dev/null | head -1); [ -n "$P" ] && echo 0 0 0 0 > $P || true'
      );
    }
    async function probeBpl2(conn, dev, w, h, fourcc, sel = true) {
      const neg = () => execOnce2(
        conn,
        `v4l2-ctl -d ${dev} --set-fmt-video=width=${w},height=${h},pixelformat=${fourcc} >/dev/null 2>&1` + (sel ? `; v4l2-ctl -d ${dev} --set-selection=target=crop,left=0,top=0,width=${w},height=${h} >/dev/null 2>&1` : "") + `; v4l2-ctl -d ${dev} --get-fmt-video 2>/dev/null | grep -E "Width/Height|Bytes per Line|Size Image"`,
        15e3
      );
      const parse = (s) => ({
        w: +(s.match(/Width\/Height\s*:\s*(\d+)\//) || [])[1] || 0,
        h: +(s.match(/Width\/Height\s*:\s*\d+\/(\d+)/) || [])[1] || 0,
        bpl: +(s.match(/Bytes per Line\s*:\s*(\d+)/) || [])[1] || 0,
        sz: +(s.match(/Size Image\s*:\s*(\d+)/) || [])[1] || 0
      });
      const expBpl = fourcc === "NV12" ? w : w * rawBytesPerSample2(fourcc);
      let r = parse(await neg());
      if (r.w !== w || r.bpl !== expBpl) {
        await sleep2(2500);
        r = parse(await neg());
      }
      return r;
    }
    async function enumSubdevCtrls2(conn, dev) {
      const out = await execOnce2(conn, `v4l2-ctl -d ${dev} -L 2>/dev/null`, 1e4);
      const ctrls = [];
      let cur = null;
      for (const ln of out.split("\n")) {
        const mi = ln.match(/^\s+(\d+): (.+)$/);
        if (mi && cur && /menu/.test(cur.type)) {
          (cur.items = cur.items || []).push({ i: +mi[1], s: mi[2].trim() });
          continue;
        }
        const m = ln.match(/^\s*([a-zA-Z0-9_]+)\s+0x[0-9a-f]+ \((\w+)\)\s*:\s*(?:min=(-?\d+)\s+max=(-?\d+)(?:\s+step=(\d+))?\s+)?default=-?\d+\s+value=(-?\d+)(.*)$/);
        if (m) {
          cur = {
            name: m[1],
            type: m[2],
            min: m[3] !== void 0 ? +m[3] : 0,
            max: m[4] !== void 0 ? +m[4] : m[2] === "bool" ? 1 : 0,
            step: +(m[5] || 1),
            value: +m[6],
            ro: /read-only/.test(m[7]),
            grabbed: /grabbed/.test(m[7])
          };
          ctrls.push(cur);
        }
      }
      return ctrls;
    }
    module2.exports = {
      enumVideoDevs: enumVideoDevs2,
      probeMedia: probeMedia2,
      cifMedia: cifMedia2,
      sensorEntityOf: sensorEntityOf2,
      probeFormats: probeFormats2,
      probeIspFmt: probeIspFmt2,
      probeModes: probeModes2,
      ensureUnpacked: ensureUnpacked2,
      probeBpl: probeBpl2,
      enumSubdevCtrls: enumSubdevCtrls2
    };
  }
});

// webui/js/server.js
init_define_IQ_SCHEMA();
{
  const onDev = (() => {
    try {
      return /rockchip/.test(require("fs").readFileSync("/proc/device-tree/compatible", "utf8"));
    } catch {
      return false;
    }
  })();
  for (const m of onDev && !process.argv.includes("--ssh") ? ["sharp"] : ["sharp", "ssh2"]) {
    try {
      require(m);
    } catch {
      console.error(`[rkcam-console] \u7F3A\u5C11\u4F9D\u8D56 ${m}(\u539F\u751F\u4E8C\u8FDB\u5236\u4E0D\u5165\u5305)\u3002\u8BF7\u5728\u672C\u6587\u4EF6\u6240\u5728\u76EE\u5F55\u6267\u884C:
    npm install
\u7136\u540E\u91CD\u65B0\u8FD0\u884C\u3002`);
      process.exit(1);
    }
  }
}
var http = require("http");
var fs = require("fs");
var path = require("path");
var { connectBoard, connectDirect, execOnce, sleep, sshHosts } = require_util();
var { rawHalf, rawBytesPerSample, nv12ToRgb } = require_decode();
var { SshRawSource, ssh2Channel } = require_ssh_source();
var { NativeConn } = require_native_conn();
var { boardInfoOnce, boardInfoPoll } = require_board_info();
var { probeIq, applyPatches, nodeAt, sftpWrite } = require_iq();
var IQ_SCHEMA = (typeof define_IQ_SCHEMA_default !== "undefined" ? define_IQ_SCHEMA_default : null) || (() => {
  try {
    return require_iq_schema();
  } catch {
    return null;
  }
})();
var {
  enumVideoDevs,
  probeMedia,
  cifMedia,
  probeFormats,
  probeIspFmt,
  ensureUnpacked,
  probeBpl,
  probeModes,
  sensorEntityOf,
  enumSubdevCtrls
} = require_media();
var sharp = require("sharp");
var arg = (k, d) => {
  const i = process.argv.indexOf(k);
  return i > 0 ? process.argv[i + 1] : d;
};
var [W, H] = arg("--size", "1920x1080").toLowerCase().split("x").map(Number);
var QUALITY = parseInt(arg("--quality", "70"));
var detectOnDevice = () => {
  try {
    return /rockchip/.test(fs.readFileSync("/proc/device-tree/compatible", "utf8"));
  } catch {
    return false;
  }
};
var NATIVE = process.argv.includes("--native") || !process.argv.includes("--ssh") && detectOnDevice();
var LOG = [];
var logSeq = 0;
function slog(s, lvl = "info") {
  const line = {
    id: ++logSeq,
    lvl,
    t: (/* @__PURE__ */ new Date()).toTimeString().slice(0, 8),
    s: String(s)
  };
  LOG.push(line);
  if (LOG.length > 300) LOG.splice(0, LOG.length - 300);
  console.log(`[${line.t}] ${line.s}`);
}
var Hub = class {
  constructor() {
    this.jpeg = null;
    this.stats = { fps: 0, frames: 0, t0: Date.now(), last: 0 };
  }
  set(jpeg) {
    this.jpeg = jpeg;
    const st = this.stats;
    st.frames++;
    st.last = Date.now();
    const dt = (st.last - st.t0) / 1e3;
    if (dt > 2) {
      st.fps = st.frames / dt;
      st.frames = 0;
      st.t0 = st.last;
    }
  }
  status() {
    const st = this.stats;
    return { fps: Date.now() - st.last > 3e3 ? 0 : st.fps };
  }
};
var session = {
  conn: null,
  src: null,
  hub: new Hub(),
  state: { time: "--:--:--", cpu: "--", ram: "--", net: "--" },
  host: null,
  fmt: null,
  subdev: "/dev/v4l-subdev2",
  busy: false,
  source: "raw",
  // 预览源('raw'=video0 直解 / 'isp'=mainpath NV12), 跨断连保留
  ispSize: null,
  // ISP 输出分辨率(null=档位全幅); ISP 缩放出流, 不动 sensor
  decW: 0,
  decH: 0,
  // 解码输出尺寸(raw=半分辨率, isp=全分辨率; snapshot 标注)
  modes: [],
  sensorEntity: null,
  modeSize: null,
  media: null,
  devs: null,
  vcmNode: null,
  iqJson: null,
  iqLoaded: null,
  iqRoots: null,
  // IQ 编辑留驻(/api/iq 探测时建, save 消费)
  iqHot: /* @__PURE__ */ new Map(),
  // 引擎热值覆盖层(apply 记账, pull 叠加显示+收敛清理)
  iqBusy: false,
  iqPktSeq: 0
};
var SRC_FILE = "/tmp/rkcam-console-source";
try {
  const v = JSON.parse(fs.readFileSync(SRC_FILE, "utf8"));
  if (v) {
    if (v.source === "isp" || v.source === "raw") session.source = v.source;
    if (/^\d+x\d+$/.test(v.ispSize || "")) session.ispSize = v.ispSize;
  }
} catch {
}
var saveSource = () => {
  try {
    fs.writeFileSync(SRC_FILE, JSON.stringify({ source: session.source, ispSize: session.ispSize }));
  } catch {
  }
};
var fmtLine = () => session.fmt ? `${session.fmt.dev} \xB7 ${session.fmt.id} ${session.fmt.w}x${session.fmt.h}` : "";
function startStream() {
  const f = session.fmt;
  const openChannel = ssh2Channel(session.conn, f.dev, f.w, f.h, f.id);
  session.src = new SshRawSource({
    h: f.h,
    fmt: f.id,
    stride: f.bpl,
    frameBytes: f.frameBytes,
    openChannel
  });
  const isp = f.id === "NV12";
  const outW = isp ? f.w : f.w >> 1, outH = isp ? f.h : f.h >> 1;
  session.decW = outW;
  session.decH = outH;
  const out = Buffer.allocUnsafe(outW * outH * 3);
  const src = session.src;
  let blackGuard = true, blackUntil = 0;
  (async () => {
    for await (const frame of src.frames((msg) => slog(msg, msg.startsWith("[src]") ? "warn" : "info"))) {
      if (src !== session.src) return;
      if (isp) {
        nv12ToRgb(frame, f.w, f.h, src.stride, out);
        if (blackGuard) {
          if (!blackUntil) blackUntil = Date.now() + 1e3;
          let s = 0, n = 0;
          for (let i = 0; i < out.length; i += 997) {
            s += out[i];
            n++;
          }
          if (s / n >= 2) blackGuard = false;
          else if (Date.now() >= blackUntil) {
            blackGuard = false;
            slog("[isp] preview black over 1s (stale 3A/pipeline state) \u2014 reconnect, or reboot board", "warn");
          }
        }
      } else rawHalf(frame, f.id, f.w, f.h, src.stride, out);
      session.hub.set(await sharp(out, { raw: { width: outW, height: outH, channels: 3 } }).jpeg({ quality: QUALITY }).toBuffer());
    }
  })().catch((e) => slog(`[stream loop exit] ${e.message}`, "err"));
}
function vcmHold(on) {
  if (on && session.vcmNode && !session.vcmHoldChan && session.conn) {
    const conn = session.conn;
    session.conn.exec(`exec 3< ${session.vcmNode}; sleep 100000`, (err, ch) => {
      if (err) {
        slog(`[vcm] hold failed: ${err.message}`, "warn");
        return;
      }
      if (session.conn !== conn) {
        try {
          ch.destroy();
        } catch {
        }
        return;
      }
      session.vcmHoldChan = ch;
    });
  } else if (!on && session.vcmHoldChan) {
    try {
      session.vcmHoldChan.destroy();
    } catch {
    }
    session.vcmHoldChan = null;
  }
}
function sessionDisconnect() {
  vcmHold(false);
  if (session.src) {
    session.src.stop();
    session.src = null;
  }
  if (session.conn) {
    try {
      session.conn.end();
    } catch {
    }
    session.conn = null;
  }
  session.host = null;
  session.fmt = null;
  session.modes = [];
  session.sensorEntity = null;
  session.modeSize = null;
  session.media = null;
  session.devs = null;
  session.vcmNode = null;
  session.iqJson = null;
  session.iqLoaded = null;
  session.iqRoots = null;
  session.iqHot.clear();
  session.hub = new Hub();
  session.state = { time: "--:--:--", cpu: "--", ram: "--", net: "--" };
}
async function setupStreamFmt(conn) {
  const devs = session.devs || (session.devs = await enumVideoDevs(conn));
  const isp = session.source === "isp";
  const f = isp ? await probeIspFmt(conn, devs) : await probeFormats(conn, devs);
  if (!f) throw Error(isp ? "no rkisp mainpath NV12 output found on board" : "no rkcif bayer RAW format found on board");
  const msz = (session.modeSize || "").match(/(\d+)x(\d+)/);
  if (msz) {
    f.w = +msz[1];
    f.h = +msz[2];
  } else {
    f.w = W;
    f.h = H;
  }
  if (isp) {
    const isz = (session.ispSize || "").match(/(\d+)x(\d+)/);
    if (isz) {
      f.w = +isz[1];
      f.h = +isz[2];
    }
  }
  if (!isp) await ensureUnpacked(conn);
  const pr = await probeBpl(conn, f.dev, f.w, f.h, f.id.replace(/U$/, ""), !isp);
  if (pr.w !== f.w) {
    if (!isp)
      throw Error(`format negotiate failed: got ${pr.w} wide \u2260 ${f.w} (video node busy?)`);
    slog(`[isp] requested ${f.w}x${f.h} clamped to ${pr.w}x${pr.h}, adopting readback`, "warn");
    f.w = pr.w;
    f.h = pr.h;
  }
  f.bpl = pr.bpl;
  if (isp) {
    if (!pr.bpl || !pr.sz)
      throw Error("NV12 negotiate failed: BpL/SizeImage unreadable");
    if (pr.sz !== pr.bpl * f.h * 3 / 2)
      throw Error(`NV12 layout mismatch: sizeimage ${pr.sz} \u2260 ${pr.bpl * f.h * 3 / 2}`);
    f.frameBytes = pr.sz;
  } else {
    if (!pr.bpl)
      throw Error('BpL unreadable: get-fmt output missing "Bytes per Line"');
    const expBpl = f.w * rawBytesPerSample(f.id);
    if (pr.bpl !== expBpl)
      throw Error(`layout mismatch: BpL ${pr.bpl} \u2260 expected ${expBpl} (compact/unpacked \u5E03\u5C40\u4E0D\u7B26 \u2014 stream would be garbled)`);
  }
  session.fmt = f;
}
var ispSizeOptions = () => {
  const b = (session.modes.length ? session.modes[session.modes.length - 1].size : session.modeSize || "").match(/(\d+)x(\d+)/);
  if (!b) return [];
  const [w, h] = [+b[1], +b[2]], seen = /* @__PURE__ */ new Set(), out = [];
  for (const d of [8, 4, 2, 1]) {
    const sw = Math.max(32, Math.round(w / d)), sh = Math.max(32, Math.round(h / d));
    const size = `${sw + (sw & 1)}x${sh + (sh & 1)}`;
    if (!seen.has(size)) {
      seen.add(size);
      out.push(size);
    }
  }
  return out;
};
async function sensorSetMode(conn, size) {
  const cifDev = cifMedia(session.media);
  const entity = session.sensorEntity;
  const code = await execOnce(
    conn,
    `media-ctl -d ${cifDev} --get-v4l2 '"${entity}":0[fmt]' 2>/dev/null`
  );
  const mbus = (code.match(/fmt:([A-Z0-9_]+)\//) || [])[1] || "SRGGB10_1X10";
  let setR = "";
  for (let i = 0; i < 2; i++) {
    setR = await execOnce(
      conn,
      `media-ctl -d ${cifDev} --set-v4l2 '"${entity}":0[fmt:${mbus}/${size}]' 2>&1`
    );
    if (!/Invalid|failed/i.test(setR)) return;
    await sleep(3e3);
  }
  throw Error(`media-ctl set ${size} rejected: ${setR.trim().slice(0, 80)}`);
}
async function ensureIspBase(conn) {
  const base = ispSizeOptions().pop();
  if (!base || !session.sensorEntity || session.modeSize === base) return;
  try {
    await sensorSetMode(conn, base);
  } catch (e) {
    throw Error(`sensor restore to ${base} failed (ISP requires base mode): ${e.message}`);
  }
  session.modeSize = base;
  slog(`[isp] sensor restored to ${base} (base mode for ISP)`, "warn");
}
async function vblankDefault(conn) {
  await execOnce(
    conn,
    `D=$(v4l2-ctl -d ${session.subdev} -l 2>/dev/null | grep vertical_blanking | grep -o 'default=[0-9]*' | cut -d= -f2); [ -n "$D" ] && [ "$(v4l2-ctl -d ${session.subdev} --get-ctrl=vertical_blanking 2>/dev/null | grep -o '[0-9]*$')" != "$D" ] && v4l2-ctl -d ${session.subdev} -c vertical_blanking=$D 2>/dev/null; true`,
    15e3
  );
}
async function sessionConnect(opts) {
  if (session.busy) throw Error("connect operation in progress");
  session.busy = true;
  try {
    const hadPrev = !!session.conn || !!session.src;
    sessionDisconnect();
    if (hadPrev) await sleep(1600);
    if (opts.native && !NATIVE) throw Error("native mode not enabled (run on device, or pass --native)");
    const conn = opts.native ? new NativeConn() : opts.alias ? await connectBoard(opts.alias) : await connectDirect(opts);
    session.conn = conn;
    session.host = opts.native ? "native" : opts.alias || opts.host;
    session.media = await probeMedia(conn);
    session.subdev = session.media.cif && session.media.cif.sensorNode || "/dev/v4l-subdev2";
    session.vcmNode = session.media.vcm && session.media.vcm.node || null;
    vcmHold(true);
    session.sensorEntity = session.media.cif && session.media.cif.sensor || await sensorEntityOf(conn, session.media);
    if (session.sensorEntity) {
      const cur = await execOnce(
        conn,
        `media-ctl -d ${cifMedia(session.media)} --get-v4l2 '"${session.sensorEntity}":0[fmt]' 2>/dev/null`
      );
      session.modeSize = (cur.match(/(\d+x\d+)/) || [])[1] || `${W}x${H}`;
    }
    await ensureModes().catch((e) => (
      // 模式表: 梯子基准要用(表最大档), 直等; 失败→梯子回落当前档
      slog(`[modes] mode table probe failed: ${e.message}`, "warn")
    ));
    if (session.source === "isp") {
      await ensureIspBase(conn);
      const ladder = ispSizeOptions();
      if (!ladder.includes(session.ispSize)) {
        session.ispSize = ladder[0] || null;
        saveSource();
      }
    }
    await setupStreamFmt(conn);
    boardInfoPoll(conn, session.state, 1, () => session.conn === conn).catch(() => {
    });
    if (session.source === "raw") await vblankDefault(conn);
    startStream();
    const info = await boardInfoOnce(conn);
    return {
      host: session.host,
      fmt: fmtLine(),
      time: info.time || "--",
      ram: info.ram || "--"
    };
  } finally {
    session.busy = false;
  }
}
var json = (res, obj, code = 200) => {
  const b = JSON.stringify(obj);
  res.writeHead(code, { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(b) });
  res.end(b);
};
var readBody = (req) => new Promise((r, j) => {
  let b = "";
  req.on("data", (d) => b += d);
  req.on("end", () => r(b));
  req.on("error", j);
});
var readJson = async (req) => {
  try {
    return JSON.parse(await readBody(req) || "{}");
  } catch (e) {
    throw Object.assign(e, { httpCode: 400 });
  }
};
async function ensureModes() {
  if (session.modes.length || !session.sensorEntity) return;
  session.modes = await probeModes(session.conn, session.media);
}
async function route(req, res) {
  const u = new URL(req.url, "http://x");
  if (u.pathname === "/") {
    const page = (true ? "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>RK Camera</title>\n<style>\n  body { margin: 0; background: #14161a; color: #d7dce3;\n         font: 14px/1.5 \"Segoe UI\", \"Noto Sans CJK SC\", sans-serif;\n         display: flex; height: 100vh; overflow: hidden; }  /* \u9489\u6B7B\u4E00\u5C4F, \u9875\u9762\u7EA7\u6EDA\u52A8\u6761\u4E0D\u51FA\u73B0 */\n  #panel { width: 300px; background: #1b1e24; border-right: 1px solid #2e333d;\n           padding: 14px; flex-shrink: 0;\n           height: 100vh; box-sizing: border-box; overflow-y: auto; }  /* \u5185\u5BB9\u8D85\u9AD8\u2192\u9762\u677F\u5185\u6EDA */\n  #panel h2 { font-size: 15px; margin: 4px 0 10px; color: #e6e9ee; }\n  #panel select, #panel input { width: 100%; background: #14161a; color: #d7dce3;\n           border: 1px solid #2e333d; border-radius: 4px; padding: 5px 6px;\n           font-size: 13px; margin-bottom: 6px; }\n  #panel select:disabled, #panel input:disabled { opacity: .45; }   /* \u5DF2\u8FDE\u63A5\u9501\u5B9A\u76EE\u6807 */\n  #manual { display: none; margin-top: 6px; }  /* \u9009\"\u624B\u52A8\u8F93\u5165\"\u65F6\u5C55\u5F00(row \u5185 select \u65E0\u4E0B\u8FB9\u8DDD, \u95F4\u8DDD\u5728\u8FD9\u91CC\u8865) */\n  #nativeBadge { display: none; margin-top: 6px; padding: 5px 8px; border: 1px solid #2d6a4f;\n                 border-radius: 4px; color: #6ecf7e; font-size: 12px; }  /* \u8BBE\u5907\u539F\u751F\u8FD0\u884C\u6807\u8BB0(\u7EFF=Live \u540C\u7CFB) */\n  #btnRetry { display: none; }                 /* \u81EA\u8FDE\u5931\u8D25\u624D\u73B0\u7684\u91CD\u8FDE\u6309\u94AE(native \u4E13\u7528) */\n  button { background: #2a4a75; color: #fff; border: 0; border-radius: 4px;\n           padding: 6px 12px; cursor: pointer; margin-top: 4px; font-size: 13px; width: 100%; }\n  button:hover { background: #35609b; }\n  button.on { background: #75402a; }  /* \u5DF2\u8FDE\u63A5 \u2192 \u65AD\u5F00\u6837\u5F0F */\n  #iqBtnLive.on { background: #2d6a4f; }  /* \u26A1 Live \u5F00(\u4FEE\u6539\u5373\u70ED\u5E94\u7528) */\n  #devinfo { margin-top: 10px; padding: 8px; border: 1px solid #2e333d; border-radius: 6px;\n             font: 12px/1.7 \"JetBrains Mono\", monospace; color: #8b93a0; display: none; }\n  #devinfo .t { color: #e6e9ee; font-size: 12.5px; }\n  #connbox { padding: 8px; border: 1px solid #2e333d; border-radius: 6px; }  /* \u9996\u6846, \u65E0 margin-top */\n  #fmtbox, #aecbox { margin-top: 10px; padding: 8px; border: 1px solid #2e333d; border-radius: 6px;\n            display: none; }                  /* \u8FDE\u63A5\u540E\u624D\u663E\u793A; aecbox \u540C\u6B3E(IQ \u6570\u636E\u5C31\u7EEA\u624D\u73B0) */\n  #aecbox h2 { display: flex; align-items: center; gap: 6px; cursor: pointer; }\n  #aecbox h2 #aecChev { color: #4a90d9; margin-left: auto; font-size: 12px; }\n  #aecBody .iqnhead { font-size: 12.5px; color: #d7dce3; }   /* \u6B65\u9AA4\u5C0F\u8282\u6807: \u6BD4 IQ \u6811\u8282\u70B9\u5934\u5927\u4E00\u53F7 */\n  #fmtRadios { display: flex; gap: 10px; align-items: center; flex: 1; min-width: 0; }\n  #fmtbox label.radio { display: flex; align-items: center; gap: 4px; font-size: 13px;\n                        cursor: pointer; color: #d7dce3; margin-bottom: 0; }\n\n  #fmtbox .chkrow { gap: 4px; }             /* \u4E24\u4E2A\u52FE\u9009\u9879\u540C\u884C\u5E73\u5206 */\n  #fmtcur { font: 11px/1.5 \"JetBrains Mono\", monospace; color: #8b93a0; }\n  /* ---- IQ \u9762\u677F(\u4E3B\u533A\u5E95\u90E8\u5DE6\u5217\u5DE5\u4F5C\u53F0; \u6309\u503C\u7C7B\u578B\u6E32\u67D3\u63A7\u4EF6) ---- */\n  #iqbox h2 { display: flex; align-items: center; gap: 6px;\n              font-size: 15px; margin: 4px 0 10px; color: #e6e9ee; }  /* \u4E0E #panel h2(Connection/Preview)\u540C\u6B3E */\n  #iqFile { flex: 1; min-width: 0; font: 10.5px \"JetBrains Mono\", monospace; color: #8b93a0;\n            overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }  /* \u6587\u4EF6\u540D\u8D85\u957F\u7701\u7565 */\n  /* ---- IQ \u7F16\u8F91\u8868\u5355(\u4E3B\u533A\u5E95\u90E8\u5DE6\u5217\u5DE5\u4F5C\u53F0; \u6309\u503C\u7C7B\u578B\u6E32\u67D3\u63A7\u4EF6) ---- */\n  .iqnode { margin: 2px 0; }\n  .iqnhead { font-size: 11px; color: #aab3bf; cursor: pointer; margin-top: 5px; user-select: none; }\n  .iqnhead:hover { color: #d7dce3; }\n  .iqnhead.iqhot, #logbox .ok { color: #6ecf7e; }    /* \u5171\u4EAB\u7EFF: \u70ED\u6A21\u5757\u7EC4\u5934 \u2261 log ok */\n  .iqnhead.iqhot:hover { color: #8fe49b; }\n  .iqfix { opacity: .55; }                           /* \u975E\u8C03\u53C2\u9879(datasheet/\u6807\u5B9A/\u6D4B\u8BD5\u8DEF\u5F84): \u53EA\u8BFB key:value, \u60AC\u505C\u770B\u539F\u56E0 */\n  .iqnbody { margin-left: 9px; border-left: 2px solid #2e333d; padding-left: 6px; }  /* \u5C42\u7EA7\u7F29\u8FDB */\n  .iqe input[type=text], .iqe select { width: 100%; margin-bottom: 0; font-size: 12px;\n                                       box-sizing: border-box; }  /* \u6839\u6CBB: 100%+padding \u4E0D\u518D\u6EA2\u51FA */\n  .iqe input[type=range] { border: 0; padding: 0; margin-bottom: 0; width: 100%;\n                           background: none; accent-color: #2a4a75; }   /* \u62B5\u6D88 #panel input \u901A\u7528\u6837\u5F0F */\n  #panel .iqe input[type=range] { border: 0; padding: 0; margin-bottom: 0; width: 100%;\n                                  background: none; accent-color: #2a4a75;\n                                  box-sizing: border-box; }  /* \u4FA7\u680F(aecbox)\u91CC #panel input \u7279\u5F02\u6027\u66F4\u9AD8, \u9700\u6B64\u89C4\u5219\u538B\u56DE */\n  .iqe input[type=radio], .iqe input[type=checkbox],\n  #fmtbox input[type=radio] { width: auto; margin-bottom: 0; accent-color: #2a4a75; }\n  .iqe.dirty > label, #logbox .warn { color: #fbbf24; }        /* \u5171\u4EAB\u7425\u73C0: dirty \u6807\u7B7E \u2261 log warn */\n  .iqe.dirty input[type=text], .iqe.dirty select { border-color: #fbbf24; }\n  .iqm { display: grid; gap: 3px; margin-top: 4px; }            /* \u77E9\u9635\u7F51\u683C(\u542B\u884C\u5217\u6807\u7B7E\u5217) */\n  .iqm .iqml { font-size: 10px; color: #64748b; display: flex; align-items: center; justify-content: center; }\n  .iqe .iqm input { width: 100%; min-width: 0; margin: 0; padding: 2px 4px; font-size: 11px; box-sizing: border-box;\n               font-family: \"JetBrains Mono\", monospace; text-align: right; }  /* \u5E26 .iqe \u524D\u7F00\u63D0\u7279\u5F02\u6027: \u5426\u5219 .iqe input[type=text] \u7684 12px \u538B\u8FC7 11px */\n  .iqw { display: grid; gap: 1px; margin-top: 4px; }           /* 15\xD715 \u6743\u91CD\u70ED\u529B\u56FE */\n  .iqwc { aspect-ratio: 1; display: flex; align-items: center; justify-content: center;\n          font-size: 8px; color: #aab3bf; cursor: pointer; border-radius: 2px;\n          user-select: none; touch-action: none; }\n\n  /* ---- \u8C03\u53C2\u9762\u677F ---- */\n  #tunebox { margin-top: 10px; padding: 8px; border: 1px solid #2e333d; border-radius: 6px;\n             display: none; }\n  #tunebox h4 { font-size: 15px; margin: 8px 0 6px; color: #e6e9ee; }\n              /* \u4E0E #panel h2(Connection/Preview/Focus)\u7EDF\u4E00: \u540C\u5B57\u53F7\u540C\u8272, \u65E0\u5927\u5199/\u5B57\u8DDD\u7279\u4F8B(focusbox \u76F4\u7528 h2) */\n  #focusbox { margin-top: 10px; padding: 8px; border: 1px solid #2e333d; border-radius: 6px;\n              display: none; }                       /* \u5BF9\u7126\u9A6C\u8FBE\u72EC\u7ACB\u6846(VCM \u6709\u624D\u663E\u793A) */\n  .row { display: flex; gap: 6px; }             /* connbox/fmtbox/tunebox/focusbox \u901A\u7528\u884C\u5BB9\u5668 */\n  .row select { flex: 1; min-width: 0; margin-bottom: 0; }\n  .row button { width: auto; flex: 0 0 auto; margin-top: 0; }  /* \u884C\u5185\u6309\u94AE: \u5185\u5BB9\u5BBD */\n  #fmtbox .row, #tunebox .row { margin-top: 8px; }\n  .ctl { margin: 7px 0; }\n  #sensCtrls .subgroup { margin: 4px 0 8px 12px; padding-left: 8px;\n                         border-left: 2px solid #2e333d; }   /* Test Pattern \u7684 Solid Color \u5B50\u7EC4 */\n  .ctl label { display: flex; justify-content: space-between; font-size: 12px; color: #aab3bf; }\n  .ctl label .v { color: #6fb3ff; font-family: \"JetBrains Mono\", monospace; }\n  #tunebox input[type=range], #focusbox input[type=range] { border: 0; padding: 0; margin-bottom: 0;\n                               background: none; accent-color: #2a4a75; }  /* \u62B5\u6D88 #panel input \u7684 padding/border, \u5426\u5219 100%+14px \u6EA2\u51FA */\n  .ctl input[type=range] { width: 100%; }\n  .ctl input[type=range]:disabled { opacity: .4; }\n  #fmtbox input[type=checkbox], #tunebox input[type=checkbox], #focusbox input[type=checkbox] { width: auto; margin-bottom: 0; }\n  #fmtbox .note, #tunebox .note, #focusbox .note { font-size: 10.5px; color: #64748b; margin: 4px 0 0; }\n  #fmtbox label.chk, #tunebox label.chk, #focusbox label.chk { display: flex; align-items: center; gap: 5px; font-size: 12px;\n                       color: #aab3bf; cursor: pointer; margin-top: 5px; }\n  #img.mirror { transform: scaleX(-1); }\n  #img.flip { transform: scaleY(-1); }\n  #img.mirror.flip { transform: scale(-1, -1); }\n  #preview { flex: 1; height: 100vh; box-sizing: border-box; padding: 16px;\n             display: flex; flex-direction: column;\n             align-items: center; min-width: 0; }\n  #imgbox { position: relative; background: #000; border: 1px solid #2e333d; border-radius: 6px;\n            aspect-ratio: 16/9; width: min(960px, 100%); flex-shrink: 0;\n            max-height: calc(100vh - 340px); overflow: hidden; }  /* \u9AD8\u5EA6\u9884\u7B97\u8BA9\u4E00\u5757\u7ED9\u5E95\u90E8 IQ \u5DE5\u4F5C\u53F0 */\n  #imgbox img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; }\n  #imgbox.off img { visibility: hidden; }              /* \u65E0\u56FE: \u9ED1\u6846\u5360\u4F4D, \u4FDD\u6301\u753B\u5E45 */\n  #imgbox.off::after { content: 'Not connected'; position: absolute; inset: 0;\n            display: flex; align-items: center; justify-content: center;\n            color: #2e333d; font-size: 20px; letter-spacing: 4px; }\n  #bottomrow { flex: 1; width: 100%; display: flex; gap: 10px; min-height: 280px; }   /* \u5E95\u90E8\u53CC\u5217\u6EE1\u5BBD(\u4E0D\u53D7\u9884\u89C8 960px \u5E3D\u9650\u5236): IQ \u5DE5\u4F5C\u53F0 | log */\n  #iqcol { flex: 0 0 46%; display: none; flex-direction: column; min-width: 0; }  /* IQ \u5217: \u5DE5\u5177\u884C + \u6846 */\n  #iqTools { display: flex; justify-content: flex-start; gap: 6px; margin-top: 10px; }  /* \u6846\u5916\u52A8\u4F5C\u884C: \u5DE6\u7EC4+\u53F3\u7EC4 */\n\n  #iqTools button.dirty { background: #75602a; opacity: 1; }   /* Push \u6709\u672A\u4FDD\u5B58\u6539\u52A8 */\n  #iqTools .rx { margin-left: auto; }                           /* \u53F3\u7EC4\u8D77\u70B9: \u26A1/\u21BB \u9876\u5230\u53F3\u7AEF */\n  #iqbox { flex: 1; min-height: 0; display: flex; flex-direction: column; margin-top: 3px;\n           box-sizing: border-box;                            /* \u540C\u7C7B\u9884\u9632: padding+border \u8BA1\u5165\u5BBD\u5EA6 */\n           padding: 8px 10px; background: #101216; border: 1px solid #2e333d;\n           border-radius: 6px; }  /* flex:1+min-height:0: \u9AD8\u5EA6\u53D7 iqcol \u7EA6\u675F \u2192 iqBody \u624D\u4F1A\u6EDA */\n  #iqBody { flex: 1; overflow-y: auto; overflow-x: hidden; min-height: 0;   /* \u7AD6\u6EDA\u4E13\u7528, \u6A2A\u5411\u6052\u4E0D\u6EDA */\n            scrollbar-gutter: stable; padding-right: 6px; }  /* \u6EDA\u52A8\u6761\u69FD\u5E38\u9A7B+\u53F3\u8BA9\u4F4D, \u4E0D\u906E\u5185\u5BB9/\u4E0D\u6296\u52A8 */\n  #iqBody::-webkit-scrollbar { width: 10px; }                 /* \u7A84\u6761\u4F46\u53EF\u89C1: thumb \u5BF9\u6DF1\u5E95\u6709\u5BF9\u6BD4\u5EA6 */\n  #iqBody::-webkit-scrollbar-thumb { background: #4a5462; border-radius: 5px; }\n  #iqBody::-webkit-scrollbar-thumb:hover { background: #5d6a80; }\n  #iqBody::-webkit-scrollbar-track { background: #16181d; border-radius: 5px; }\n  #logcol { flex: 1; display: flex; flex-direction: column; min-width: 0; }\n  #logbar { width: 100%; display: flex; justify-content: flex-end; margin-top: 10px; }\n  #logbar button, #iqTools button { width: auto; margin: 0; padding: 2px 10px; font-size: 11px; opacity: .75; }\n  #logbox { flex: 1; width: 100%; min-height: 0; margin-top: 3px; box-sizing: border-box;  /* \u6839\u6CBB: 100%+padding \u4E0D\u518D\u6EA2\u51FA\u53F3\u7F18 */\n            background: #101216; border: 1px solid #2e333d; border-radius: 6px;\n            overflow-y: auto; padding: 6px 10px;\n            font: 11px/1.6 \"JetBrains Mono\", monospace; color: #8b93a0;\n            white-space: pre-wrap; word-break: break-all; }\n\n\n  #logbox .err { color: #e07070; }\n</style>\n</head>\n<body>\n<div id=\"panel\">\n  <div id=\"connbox\">\n    <h2>Connection</h2>\n    <div class=\"row\" id=\"connRow\">\n      <select id=\"hostSel\" onchange=\"selChanged()\"></select>\n      <button id=\"btnConn\" onclick=\"toggleConn()\">Connect</button>\n    </div>\n    <div id=\"nativeBadge\">\u{1F5A5} On-device (native)</div>\n    <button id=\"btnRetry\" onclick=\"nativeRetry()\">\u21BB Retry</button>\n    <div id=\"manual\">\n      <input id=\"mHost\" placeholder=\"IP / hostname\">\n      <input id=\"mUser\" placeholder=\"Username (root)\">\n      <input id=\"mPass\" type=\"password\" placeholder=\"Password\">\n    </div>\n    <div id=\"devinfo\"></div>\n  </div>\n  <div id=\"fmtbox\">\n    <h2>Preview</h2>\n    <div class=\"row\">\n      <div id=\"fmtRadios\">\n        <label class=\"radio\" title=\"rkcif bayer RAW direct decode (video0)\"><input type=\"radio\" name=\"fmt\" value=\"raw\" checked onchange=\"sourceChanged()\"> Sensor</label>\n        <label class=\"radio\" title=\"rkisp mainpath NV12 (video11) \u2014 minimal-intervention pull, 3A untouched (adaptive when rkaiq runs)\"><input type=\"radio\" name=\"fmt\" value=\"isp\" onchange=\"sourceChanged()\"> ISP</label>\n      </div>\n      <button id=\"btnSnap\" onclick=\"snapshot()\" disabled>\u{1F4F7} Snapshot</button>\n    </div>\n    <div class=\"row\">\n      <select id=\"modeSel\" onchange=\"modeChanged()\" disabled><option disabled selected value=\"\">\u2014</option></select>\n    </div>\n    <div id=\"fmtcur\">--</div>\n    <div class=\"row chkrow\">\n      <label class=\"chk\"><input type=\"checkbox\" id=\"cbMirror\" onchange=\"applyOrient()\"> \u21C4 Mirror</label>\n      <label class=\"chk\"><input type=\"checkbox\" id=\"cbFlip\" onchange=\"applyOrient()\"> \u21C5 Flip</label>\n    </div>\n    <div class=\"note\">Mirror/Flip: display only. Sensor modes &amp; controls: Sensor source. ISP: output 1/8\u20131/1, IQ/AEC tuning.</div>\n  </div>\n  <div id=\"aecbox\">                           <!-- AEC \u4E94\u6B65\u5FEB\u901F\u8C03\u8BD5(Guide \xA74.1.3), IQ \u6570\u636E\u5C31\u7EEA\u624D\u663E\u793A; \u6846/\u6B65\u7686\u53EF\u6298\u53E0 -->\n    <h2 onclick=\"aecToggleBox()\">AEC Quick Tune<span id=\"aecChev\">\u25BE</span></h2>\n    <div id=\"aecBody\"></div>\n  </div>\n  <div id=\"tunebox\">\n    <div id=\"sensorbox\" style=\"display:none\">\n      <h4 id=\"sensTitle\">Sensor</h4>\n      <div id=\"sensCtrls\"><div class=\"note\">Loading controls\u2026</div></div>\n    </div>\n  </div>\n  <div id=\"focusbox\">                        <!-- \u5BF9\u7126\u9A6C\u8FBE\u72EC\u7ACB\u6846(\u6709 VCM \u624D\u663E\u793A) -->\n    <h2 id=\"focTitle\">Focus</h2>\n    <div id=\"focCtrls\"></div>\n  </div>\n</div>\n<div id=\"preview\">\n  <div id=\"imgbox\" class=\"off\">\n    <img id=\"img\" alt=\"camera preview\">   <!-- \u65E0\u521D\u59CB src: \u672A\u8FDE\u63A5\u96F6\u8BF7\u6C42, \u8FDE\u63A5\u6CBF rc() \u9996\u8BBE -->\n  </div>\n  <div id=\"bottomrow\">                        <!-- \u5E95\u90E8\u53CC\u5217: IQ \u5DE5\u4F5C\u53F0(\u6709\u6570\u636E\u624D\u73B0) | log -->\n    <div id=\"iqcol\">\n      <div id=\"iqTools\">                      <!-- \u6846\u5916\u52A8\u4F5C\u884C: \u5DE6 Pull/Push, \u53F3 \u26A1/\u21BB(Restore \u56FE\u6807) -->\n        <button onclick=\"loadIq()\" title=\"pull/refresh from board (discard unsaved edits)\">Pull</button>\n        <button id=\"iqBtnPush\" onclick=\"iqSave()\" title=\"push unsaved edits to board file (.bak backup) + restart 3A\">Push</button>\n        <button id=\"iqBtnLive\" class=\"rx\" onclick=\"iqToggleLive()\" title=\"\u26A1 Live: hot-apply edits on change via unix socket (lost on reboot; Push to persist). Off = collect edits, apply on Push\">\u26A1</button>\n        <button onclick=\"iqRestore()\" title=\"restore board file from latest .bak-MMDD (rollback to latest backup)\">\u21BB</button>\n      </div>\n      <div id=\"iqbox\">\n        <h2>IQ<span id=\"iqFile\"></span></h2>\n        <div id=\"iqBody\"><div class=\"note\">probing\u2026</div></div>\n      </div>\n    </div>\n    <div id=\"logcol\">\n      <div id=\"logbar\"><button onclick=\"clearLog()\">\u2715 Clear</button></div>\n      <div id=\"logbox\"></div>\n    </div>\n  </div>\n</div>\n<script>\nconst $ = id => document.getElementById(id);\n// log \u7A97\u8FFD\u52A0\u4E00\u884C(500 \u884C\u4E0A\u9650): forceScroll=\u52A8\u4F5C\u6D88\u606F\u5FC5\u53EF\u89C1; \u8F6E\u8BE2\u884C\u53EA\u8D34\u5E95\u624D\u81EA\u52A8\u6EDA\nfunction appendLog(text, cls, forceScroll) {\n  const box = $('logbox');\n  const atBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 20;\n  const div = document.createElement('div');\n  if (cls) div.className = cls;\n  div.textContent = text;\n  box.appendChild(div);\n  while (box.childNodes.length > 500) box.removeChild(box.firstChild);\n  if (forceScroll || atBottom) box.scrollTop = box.scrollHeight;\n}\n// \u5BA2\u6237\u7AEF\u8FC7\u7A0B\u6D88\u606F\u8FDB log \u7A97(\u6210\u529F\u8DEF\u5F84\u591A\u7531\u670D\u52A1\u7AEF slog \u8986\u76D6, \u8FD9\u91CC\u53EA\u8865\u8FDB\u5EA6\u4E0E\u672C\u5730\u9519\u8BEF)\nfunction clog(text, cls) {\n  appendLog(`${new Date().toTimeString().slice(0, 8)} ${text}`, cls, true);\n}\nconst post = (url, body) => fetch(url, { method: 'POST',\n  headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).then(r => r.json());\nconst img = $('img');\n// MJPEG \u4FDD\u6D3B: error/load \u4E8B\u4EF6\u9A71\u52A8\u91CD\u8FDE(\u6D4F\u89C8\u5668\u4F1A abort \u957F\u6D41, 500ms \u91CD\u8BBE src \u63A5\u7EED)\u3002\n// \u4EC5\u8FDE\u63A5\u65F6\u81EA\u65CB\u2014\u2014\u672A\u8FDE\u63A5 /stream \u6052 503, \u81EA\u65CB\u662F\u7EAF\u7A7A\u8F6C(\u7531 refresh() \u6309 connected \u5207\u6362)\u3002\nlet streamOn = false;\nconst rc = () => { if (streamOn) img.src = '/stream?r=' + Date.now(); };\nfor (const ev of ['error', 'load']) img.addEventListener(ev, () => setTimeout(rc, 500));\ndocument.addEventListener('visibilitychange', () => { if (!document.hidden) rc(); });\n\n// ---- \u4E3B\u673A\u4E0B\u62C9: localStorage \u7F13\u5B58\u5373\u65F6\u586B\u5145; focus(\u5C55\u5F00\u4E0B\u62C9)\u65F6\u91CD\u8BFB\u6E05\u5355(\u77AC\u65F6) ----\nfunction fillHosts(hosts) {\n  const sel = $('hostSel');\n  const prev = sel.value;             // \u5237\u65B0\u671F\u95F4\u4E0D\u6253\u65AD\u5F53\u524D\u9009\u62E9\n  sel.innerHTML = '';\n  for (const h of (hosts || [])) {\n    const o = document.createElement('option'); o.value = h; o.textContent = h; sel.appendChild(o);\n  }\n  const o = document.createElement('option'); o.value = '__manual__'; o.textContent = '\u270E Manual IP / password';\n  sel.appendChild(o);\n  try {                               // \u9009\u62E9\u4F18\u5148\u7EA7: \u5F53\u524D\u9879\u4ECD\u5728\u6E05\u5355 > \u4E0A\u6B21\u5B58\u50A8(rkHost) > \u9996\u9879\n    const last = localStorage.getItem('rkHost');\n    const want = (prev && [...sel.options].some(x => x.value === prev)) ? prev : last;\n    if (want && [...sel.options].some(x => x.value === want)) sel.value = want;\n  } catch {}\n  selChanged();\n  try {                               // \u624B\u52A8\u8FDE\u63A5\u51ED\u636E\u56DE\u586B(rkManual): \u5207\u5230 Manual \u5373\u6709\u503C\n    const m = JSON.parse(localStorage.getItem('rkManual') || 'null');\n    if (m && m.host) {\n      $('mHost').value = m.host;\n      if (m.user) $('mUser').value = m.user;\n      if (m.password) $('mPass').value = m.password;\n    }\n  } catch {}\n}\n\nlet hostProbe = 0;\nasync function refreshHosts() {       // \u91CD\u8BFB ~/.ssh/config \u6E05\u5355(\u670D\u52A1\u7AEF\u77AC\u65F6); \u5E76\u53D1\u53BB\u91CD, \u540E\u5230\u8986\u76D6\n  const my = ++hostProbe;\n  try {\n    const hosts = await (await fetch('/api/ssh-hosts')).json();\n    if (my !== hostProbe || !Array.isArray(hosts) || !hosts.length) return;\n    try { localStorage.setItem('rkHosts', JSON.stringify(hosts)); } catch {}\n    fillHosts(hosts);\n  } catch {}\n}\nfunction selChanged() {\n  const v = $('hostSel').value;\n  $('manual').style.display = v === '__manual__' ? 'block' : 'none';\n  try { localStorage.setItem('rkHost', v); } catch {}\n}\n\nasync function toggleConn() {\n  const btn = $('btnConn');\n  if (btn.classList.contains('on')) {                    // \u65AD\u5F00\n    btn.disabled = true; clog('Disconnecting\u2026');\n    await fetch('/api/disconnect', { method: 'POST' }).catch(() => {});\n    btn.disabled = false; refresh();\n    return;\n  }\n  let body;\n  if ($('hostSel').value === '__manual__') {\n    if (!$('mHost').value.trim()) { clog('Enter IP / hostname', 'err'); return; }\n    body = { host: $('mHost').value.trim(), user: $('mUser').value.trim() || 'root',\n             password: $('mPass').value };\n  } else {\n    body = { alias: $('hostSel').value };\n  }\n  btn.disabled = true;\n  clog(`Connecting to ${body.host || body.alias}\u2026 (probe ~5s)`);\n  try {\n    const r = await post('/api/connect', body);\n    if (!r.ok) clog(r.error || 'Connect failed', 'err');   // \u6210\u529F\u7531\u670D\u52A1\u7AEF slog \u8FDB log\n    else if (body.host) try { localStorage.setItem('rkManual', JSON.stringify(body)); } catch {}  // \u8FDE\u4E0A\u624D\u5B58(\u5BC6\u7801\u660E\u6587)\n  } catch (e) { clog(`Connect failed: ${e}`, 'err'); }\n  btn.disabled = false; refresh();\n}\n\n// native(\u8BBE\u5907\u539F\u751F\u8FD0\u884C)\u81EA\u8FDE\u5931\u8D25\u540E\u7684\u624B\u52A8\u91CD\u8FDE: Connect \u9762\u677F\u5DF2\u9690\u85CF, \u8FD9\u662F\u552F\u4E00\u5165\u53E3\nasync function nativeRetry() {\n  const b = $('btnRetry');\n  b.disabled = true; clog('Reconnecting (native)\u2026');\n  try {\n    const r = await post('/api/connect', { native: true });\n    if (!r.ok) clog(r.error || 'Reconnect failed', 'err');  // \u6210\u529F\u7531\u670D\u52A1\u7AEF slog \u8FDB log\n  } catch (e) { clog(`Reconnect failed: ${e}`, 'err'); }\n  b.disabled = false; refresh();\n}\n\n// ---- \u5206\u8FA8\u7387\u4E0B\u62C9(\u53CC\u8BED\u4E49): raw=sensor \u6863(/api/modes, \u539F\u5730\u6362\u6863) / isp=\u8F93\u51FA\u68AF\u5B50(/api/ispsize, \u7F29\u653E\u51FA\u6D41);\n//      \u9009\u4E2D\u503C\u4E0D\u7F13\u5B58\u2014\u2014\u6BCF\u62CD\u4EE5 /api/status \u56DE\u663E\u5BF9\u9F50(\u670D\u52A1\u7AEF\u552F\u4E00\u771F\u503C) ----\nlet curMode = null, modeBusy = false, curHost = null, modeOpts = [], curSource = 'raw';  // modeOpts=raw \u6863\u4F4D\u6E05\u5355; curSource=modeChanged \u5206\u53D1\u952E\nfunction fillModeSel(modes) {                          // \u9009\u9879\u586B\u5145(\u7F13\u5B58/\u5728\u7EBF\u4E24\u8DEF\u5171\u7528)\n  modeOpts = modes.map(m => m.size);                   // \u8BB0\u5F55\u6E05\u5355\u4F9B refresh \u53CC\u8BED\u4E49\u91CD\u5EFA\u7528\n  if (curSource === 'isp') return;                     // isp \u6E90\u4E0B\u62C9=\u8F93\u51FA\u68AF\u5B50(refresh \u7BA1), \u8FD9\u91CC\u53EA\u8BB0\u5F55\u6E05\u5355\n  const sel = $('modeSel');\n  sel.innerHTML = '';\n  for (const m of modes) {\n    const o = document.createElement('option');\n    o.value = m.size; o.textContent = m.size;\n    sel.appendChild(o);\n  }\n  if (!sel.options.length)                            // framesizes \u679A\u4E3E\u4E0D\u53EF\u7528: \u5360\u4F4D\u4E0D\u7ED9\u9009\n    sel.appendChild(Object.assign(document.createElement('option'),\n      { textContent: 'no discrete modes', disabled: true }));\n  if (curMode && [...sel.options].some(o => o.value === curMode)) sel.value = curMode;\n}\nasync function loadModes() {                    // \u6863\u4F4D\u8868: /api/modes \u76F4\u53D6(server \u8FDE\u63A5\u5E8F\u5217\u5DF2\u5728\u6D41\u524D\u9759\u9ED8\u7A97\u63A2\u597D, \u5185\u5B58\u76F4\u51FA)\n  const host = curHost;                         // \u5FEB\u7167: \u65AD\u5F00\u6CBF\u7F6E null \u540E, \u8FDF\u5230\u7684\u56DE\u5305\u4E0D\u518D\u56DE\u586B\n  try {\n    const r = await (await fetch('/api/modes')).json();\n    if (!Array.isArray(r.modes)) { delete $('fmtbox').dataset.modes; return; }   // \u63A2\u6D4B\u5931\u8D25/\u7ADE\u6001: \u4E0B\u62CD\u91CD\u8BD5\n    if (host === curHost) { fillModeSel(r.modes); clog(`modes: ${r.modes.length} \u2713`); }   // \u81EA\u8BC1: \u8FDE\u63A5\u6CBF\u5FC5\u73B0\u6B64\u884C\n  } catch {}\n}\n// \u6362\u6D41\u8BF7\u6C42\u516C\u5171\u94FE(mode/source/ispsize \u4E09\u8DEF\u5171\u7528): \u9501\u63A7\u4EF6 \u2192 POST \u2192 error/note \u8FDB log\n//   \u2192 \u89E3\u9501+refresh(\u6210\u529F\u8DEF\u5F84\u7531\u670D\u52A1\u7AEF slog \u8FDB log \u7A97)\nfunction rekeyUI(url, body, tag, lock, unlock) {\n  lock();\n  clog(tag);\n  post(url, body)\n    .then(r => { if (!r.ok && r.error) clog(r.error, 'err');\n                 else if (r.note) clog(r.note); })   // \"already ...\" \u7C7B\u65E0 slog, \u672C\u5730\u8865\n    .catch(e => clog(`${tag} failed: ${e}`, 'err'))\n    .finally(() => { unlock(); refresh(); });\n}\nfunction modeChanged() {\n  const sel = $('modeSel'), size = sel.value;\n  if (!size) return;\n  const lock = () => { modeBusy = true; sel.disabled = true; };   // \u6362\u6D41\u5728\u9014\u9501\u4E0B\u62C9(finally \u6CBF\u89E3\u9501)\n  const unlock = () => { modeBusy = false; };\n  if (curSource === 'isp')                          // ISP \u8F93\u51FA\u68AF\u5B50: \u539F\u5730\u6362\u6D41(~2s), sensor \u4E0D\u52A8\n    return rekeyUI('/api/ispsize', { size }, `ISP size \u2192 ${size}\u2026`, lock, unlock);\n  rekeyUI('/api/mode', { size }, `Mode \u2192 ${size}\u2026 (in-place rekey)`, lock, unlock);\n}\n\n// ---- \u9884\u89C8\u6E90 radio(Sensor=rkcif \u76F4\u89E3 / ISP=mainpath NV12): POST /api/source \u539F\u5730\u6362\u6D41 ----\nlet srcBusy = false;                                   // \u5207\u6362\u5728\u9014: \u4E0D\u56DE\u5F39 radio(refresh \u5BF9\u9F50\u8DF3\u8FC7)\nfunction sourceChanged() {\n  const rd = document.querySelector('input[name=fmt]:checked');\n  if (!rd || srcBusy) return;\n  rekeyUI('/api/source', { source: rd.value }, `Preview source \u2192 ${rd.value}\u2026`,\n          () => { srcBusy = true; }, () => { srcBusy = false; });\n}\n\n// ---- sensor \u76F4\u63A7\u9762\u677F: /api/subdev-ctrls \u52A8\u6001\u679A\u4E3E \u2192 \u6ED1\u5757; \u5199\u7ECF /api/subdev-set(\u767D\u540D\u5355+\u8BFB\u56DE\u6821\u9A8C) ----\nconst sensTimers = {};\n// gain \u5B9A\u70B9\u53E3\u5F84(\u677F\u6D4B imx708 rk \u9A71\u52A8): analogue_gain 1x=1024 / digital_gain 1x=256, \u4E24\u57FA\u6570\u4E0D\u540C;\n// \u663E\u793A\u53CC\u53E3\u5F84 \"1.7x (1787)\": \u500D\u6570=\u8C03\u53C2\u5DE5\u4F5C\u5355\u4F4D(\u4E0E IQ Route.GainDot \u7EBF\u6027\u500D\u6570\u540C\u53E3\u5F84), \u62EC\u53F7\u88F8\u503C\u5BF9 v4l2-ctl \u8BFB\u6570\nconst GAIN_BASE = { analogue_gain: 1024, digital_gain: 256 };\nconst GAINX = (name, v) => (v / GAIN_BASE[name]).toFixed(1) + 'x (' + v + ')';\nasync function loadSensCtrls() {\n  try {\n    const r = await (await fetch('/api/subdev-ctrls')).json();\n    if (r.subdev) $('sensTitle').textContent = `Sensor (${r.subdev})`;\n    renderSensCtrls(r.ctrls || [], $('sensCtrls'), false);\n    const fb = $('focusbox');                        // \u5BF9\u7126\u9A6C\u8FBE\u6846(\u6709 VCM \u624D\u663E\u793A)\n    if (r.vcm && (r.vcm.ctrls || []).length) {\n      $('focTitle').textContent = `Focus (${r.vcm.node})`;\n      renderSensCtrls(r.vcm.ctrls, $('focCtrls'), true);\n      fb.dataset.has = '1';\n    } else { $('focCtrls').innerHTML = ''; fb.dataset.has = ''; }\n  } catch (e) { $('sensCtrls').innerHTML = `<div class=\"note\">Failed to load controls: ${e}</div>`; }\n}\n// \u6392\u5E8F\u4F18\u5148\u7EA7: \u5E38\u7528\u63A7\u4EF6\u5728\u524D(rank \u5C0F), \u672A\u5217\u51FA\u7684 = 50, flip/\u6D4B\u8BD5\u56FE\u6848\u57AB\u5E95(\u8BCA\u65AD\u7528)\nconst CTRL_RANK = { exposure: 0, analogue_gain: 1, digital_gain: 2,\n                    vertical_blanking: 3, horizontal_flip: 90, vertical_flip: 91, test_pattern: 99 };\nconst ctrlRank = n => (n in CTRL_RANK) ? CTRL_RANK[n] : 50;\n// \u53EA\u8BFB\u8BCA\u65AD\u503C: \u4E0D\u51FA\u6ED1\u6746/\u4E0B\u62C9, \u6536\u8FDB\u5E95\u90E8\u6309\u4FE1\u53F7\u94FE\u6392\u5E8F\u9010\u884C\u663E\u793A(Link Freq\u2192Pixel Rate\u2192Hblank)\nconst RO_FOOT = new Set(['horizontal_blanking', 'pixel_rate', 'link_frequency']);\nconst RO_FOOT_ORDER = ['link_frequency', 'pixel_rate', 'horizontal_blanking'];\n// \u5927\u8303\u56F4\u63A7\u4EF6(\u6BD4\u503C>100, \u5982 vblank 40..8387616)\u7EBF\u6027\u6ED1\u6746\u4E00\u683C\u683C\u8DF3\u6570\u4E07 \u2192 \u5BF9\u6570\u6620\u5C04:\n// \u6ED1\u6746 0..1000 \u6309\u6307\u6570\u6620\u5C04\u5230 min..max, \u4F4E\u533A\u7EC6/\u9AD8\u533A\u7C97, \u6BCF\u683C\u5206\u8FA8\u7387 \u22480.7%\nconst LOGR = 100;\nconst toLog = (v, lo, hi) => Math.max(0, Math.min(1000,\n  Math.round(1000 * Math.log(Math.max(v, lo) / lo) / Math.log(hi / lo))));\nconst fromLog = (t, lo, hi) => Math.round(lo * Math.pow(hi / lo, t / 1000));\nfunction renderSensCtrls(ctrls, box, isVcm) {    // box=\u76EE\u6807\u5BB9\u5668(sensor/focus \u5171\u7528\u6E32\u67D3)\n  box.innerHTML = '';\n  box._flipRow = null;                            // \u91CD\u7ED8\u540E\u65E7 flip \u884C\u5DF2\u8131\u79BB DOM, \u5FC5\u987B\u6E05\u5F15\u7528\n  const foot = [];\n  // Solid Color \u56DB\u5206\u91CF(R/Gr/B/Gb, V4L2_CID_TEST_PATTERN_*=0x009e0904~07)\u53EA\u5728 Solid Color\n  // \u6863\u751F\u6548\u2014\u2014\u62BD\u51FA\u6302\u5230 Test Pattern \u4E0B\u62C9\u4E0B\u505A\u5B50\u7EC4, \u9009\u8BE5\u6863\u624D\u5C55\u5F00\n  const SOLID_LBL = { red_pixel_value: 'R', green_red_pixel_value: 'Gr',\n                      blue_pixel_value: 'B', green_blue_pixel_value: 'Gb' };\n  const solid4 = ctrls.filter(c => c.name in SOLID_LBL)\n    .sort((a, b) => Object.keys(SOLID_LBL).indexOf(a.name) - Object.keys(SOLID_LBL).indexOf(b.name));\n  const tp = ctrls.find(c => c.name === 'test_pattern');\n  const solidIdx = tp && tp.items && (tp.items.find(it => /solid/i.test(it.s)) || {}).i;\n  const hasNest = !!tp && solid4.length === 4 && solidIdx !== undefined;\n  const list = [...ctrls].filter(c => !(hasNest && c.name in SOLID_LBL))\n    .sort((a, b) => ctrlRank(a.name) - ctrlRank(b.name));\n  for (const c of list) {\n    const noItems = c.type === 'menu' && !(c.items && c.items.length);\n    const disabled = c.ro || noItems;              // \u53EA\u8BFB \u2192 \u7981\u7528\u6001\u5C55\u793A(\u503C\u53EF\u89C1, \u4E0D\u53EF\u8C03)\n    const lbl = ({ exposure: 'Exposure', analogue_gain: 'Analogue Gain', digital_gain: 'Digital Gain',\n                   vertical_blanking: 'Vblank', horizontal_blanking: 'Hblank',\n                   link_frequency: 'Link Freq', pixel_rate: 'Pixel Rate',\n                   test_pattern: 'Test Pattern' })[c.name] || c.name;\n    if (disabled && RO_FOOT.has(c.name)) {   // \u53EA\u8BFB\u8BCA\u65AD: \u83DC\u5355\u578B\u53D6\u9879\u6587\u5B57\u800C\u975E\u7D22\u5F15\n      const iv = (c.items || []).find(x => x.i === c.value);\n      foot.push({ name: c.name, text: `${lbl} ${iv ? iv.s : c.value}` });\n      continue;\n    }\n    if (c.type === 'bool') {                       // bool \u2192 \u52FE\u9009(flip \u5BF9\u540C\u884C\u5E76\u6392)\n      const blbl = ({ horizontal_flip: 'Horizontal Flip', vertical_flip: 'Vertical Flip' })[c.name] || c.name;\n      const cb = document.createElement('input');\n      cb.type = 'checkbox'; cb.checked = !!c.value; cb.disabled = disabled;\n      cb.onchange = () => sensSet(c.name, cb.checked ? 1 : 0, false, isVcm);\n      const lb = document.createElement('label');\n      lb.className = 'chk';\n      lb.appendChild(cb); lb.appendChild(document.createTextNode(' ' + blbl));\n      if (c.name === 'horizontal_flip' || c.name === 'vertical_flip') {\n        if (!box._flipRow) {\n          const row = document.createElement('div');\n          row.className = 'row';\n          row.style.marginTop = '0'; row.style.gap = '4px';\n          box.appendChild(row);\n          box._flipRow = row;\n        }\n        box._flipRow.appendChild(lb);\n      } else {\n        const div = document.createElement('div');\n        div.className = 'ctl';\n        div.appendChild(lb);\n        box.appendChild(div);\n      }\n      continue;\n    }\n    if (c.items && c.items.length) {               // \u53EF\u5199\u83DC\u5355(\u5982 test_pattern) \u2192 \u4E0B\u62C9\n      const div = document.createElement('div');\n      div.className = 'ctl';\n      const selEl = document.createElement('select');\n      for (const it of c.items) {\n        const o = document.createElement('option');\n        o.value = it.i; o.textContent = it.s; selEl.appendChild(o);\n      }\n      selEl.value = c.value;\n      selEl.disabled = disabled;\n      selEl.onchange = () => sensSet(c.name, +selEl.value, false, isVcm);\n      div.innerHTML = `<label>${lbl}</label>`;\n      div.appendChild(selEl);\n      box.appendChild(div);\n      if (c.name === 'test_pattern' && hasNest) {     // \u56DB\u5206\u91CF\u5B50\u7EC4: \u968F Solid Color \u6863\u5C55\u5F00/\u6536\u8D77\n        const grp = document.createElement('div');\n        grp.className = 'subgroup';\n        for (const sc of solid4) {\n          const d2 = document.createElement('div');\n          d2.className = 'ctl';\n          d2.innerHTML = `<label>${SOLID_LBL[sc.name]}<span class=\"v\" id=\"sv-${sc.name}\">${sc.value}</span></label>`\n            + `<input type=\"range\" id=\"sr-${sc.name}\" min=\"${sc.min}\" max=\"${sc.max}\" step=\"${sc.step || 1}\" value=\"${sc.value}\">`;\n          d2.querySelector('input').oninput = e => sensSet(sc.name, +e.target.value, false, isVcm);\n          grp.appendChild(d2);\n        }\n        const sync = () => { grp.style.display = +selEl.value === solidIdx ? 'block' : 'none'; };\n        selEl.addEventListener('change', sync); // \u9009\u6863\u5373\u65F6\u5C55\u5F00(\u91CD\u7ED8\u7531 sensSet \u7684\u56DE\u5305\u63A5\u7BA1)\n        sync();\n        box.appendChild(grp);\n      }\n      continue;\n    }\n    const isGain = c.name in GAIN_BASE;\n    const useLog = !disabled && c.min >= 1 && c.max > c.min * LOGR;    // \u5BF9\u6570\u6ED1\u6746(\u53EA\u8BFB\u7684\u6CA1\u5FC5\u8981)\n    const attrs = useLog ? 'min=\"0\" max=\"1000\" step=\"1\"'\n                         : `min=\"${c.min}\" max=\"${c.max}\" step=\"${c.step || 1}\"`;\n    const sval = useLog ? toLog(c.value, c.min, c.max) : c.value;\n    const div = document.createElement('div');\n    div.className = 'ctl';\n    div.innerHTML = `<label>${lbl}<span class=\"v\" id=\"sv-${c.name}\">${isGain ? GAINX(c.name, c.value) : c.value}</span></label>`\n      + `<input type=\"range\" id=\"sr-${c.name}\" ${attrs} value=\"${sval}\"${disabled ? ' disabled' : ''}>`;\n    if (!disabled)\n      div.querySelector('input').oninput = e => {\n        const v = useLog ? fromLog(+e.target.value, c.min, c.max) : +e.target.value;\n        sensSet(c.name, v, isGain, isVcm);\n      };\n    box.appendChild(div);\n  }\n  if (foot.length) {                               // \u53EA\u8BFB\u8BCA\u65AD: \u6309\u4FE1\u53F7\u94FE\u6392\u5E8F\u9010\u884C\n    foot.sort((a, b) => RO_FOOT_ORDER.indexOf(a.name) - RO_FOOT_ORDER.indexOf(b.name));\n    for (const f of foot) {\n      const d = document.createElement('div');\n      d.className = 'note';\n      d.textContent = f.text;\n      box.appendChild(d);\n    }\n  }\n}\nfunction sensSet(name, value, isGain, vcm) {\n  const lab = $('sv-' + name);\n  if (lab) lab.textContent = isGain ? GAINX(name, value) : value;\n  const key = (vcm ? 'v:' : '') + name;             // \u9632\u6296\u952E\u52A0\u57DF\u524D\u7F00(sensor/VCM \u540C\u540D\u4E92\u4E0D\u8E29)\n  clearTimeout(sensTimers[key]);\n  sensTimers[key] = setTimeout(async () => {\n    try {\n      const r = await post('/api/subdev-set', { name, value, vcm: !!vcm });\n      if (r.ctrls) renderSensCtrls(r.ctrls, $('sensCtrls'), false);   // vblank \u2192 \u66DD\u5149\u4E0A\u9650\u53D8\u5316, \u91CD\u7ED8 sensor \u6ED1\u5757\n    } catch {}                                  // \u5931\u8D25/\u6210\u529F\u5747\u5DF2\u7531\u670D\u52A1\u7AEF slog \u8FDB log \u7A97\n  }, 300);\n}\nfunction snapshot() {                    // \u7ED3\u679C\u7531\u670D\u52A1\u7AEF slog \u8FDB log \u7A97(raw \u9636\u6BB5\u9762\u677F\u63D0\u793A\u4E0D\u53EF\u89C1)\n  fetch('/api/snapshot').catch(() => {});\n}\n\n// ---- IQ \u9762\u677F: /api/iq \u6587\u4EF6\u89E3\u6790\u516D\u6A21\u5757\u5173\u952E\u53C2\u6570(\u4EAE\u5EA6\u94FE sensor_calib+AE, \u989C\u8272\u94FE BLC/AWB/CCM/Gamma);\n//      \u8BED\u4E49/\u8C03\u53C2\u65B9\u5411\u89C1 rk-isp-tune/references/iq-json-key-params.md;\n//      \u5206\u7EC4 edit \u5F00\u5173 \u2192 \u6309\u503C\u7C7B\u578B\u6E32\u67D3\u53EF\u7F16\u8F91\u8868\u5355(bool\u2192chk / \u5DF2\u77E5\u679A\u4E3E\u2192radio|select / \u5DF2\u77E5\u8303\u56F4\u2192slider /\n//      \u5176\u4F59\u6570\u503C\u2192editbox / \u6570\u7EC4\u2192\u9017\u53F7\u6846(\u9501\u5143\u7D20\u4E2A\u6570) / \u5BF9\u8C61\u2192\u6298\u53E0\u7EC4); \u6539\u52A8\u6536\u96C6 \u2192 /api/iq/save \u5199\u56DE\u677F\u4E0A\u6587\u4EF6 ----\nlet iqEdits = new Map();                          // `${module}|${path}` \u2192 {module,path,value}(\u4EC5\u5DF2\u6539\u52A8\u9879)\nlet iqLoadedName = '';\n// \u9ED8\u8BA4\u5C55\u5F00\u7684\u5173\u952E\u7EC4\u767D\u540D\u5355(\u6A21\u5757:\u76F8\u5BF9\u8DEF\u5F84); \u5176\u4F59\u7EC4\u9ED8\u8BA4\u6536\u8D77\nconst IQ_OPEN = new Set([\n  'sensor_calib:resolution', 'sensor_calib:CISExpUpdate/Linear',\n  'ae_calib:LinearAeCtrl/Route', 'ae_calib:LinearAeCtrl/DySetpoint', 'ae_calib:LinearAeCtrl/InitExp',\n  'ablc_calib:BlcTuningPara/BLC_Data', 'wb_v21:manualPara/cfg',\n]);\nconst escHtml = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');\n// IQ \u53C2\u6570 schema(\u8DEF\u5F84\u2192{r:\u8303\u56F4, e:\u679A\u4E3E, s:\u6B65\u8FDB}; iq_parser_v2 \u5934\u6587\u4EF6\u751F\u6210, \u540E\u7AEF /api/iq-schema \u4E0B\u53D1)\n// \u8DEF\u5F84\u91CC\u6570\u7EC4\u5143\u7D20\u4EE5 '#' \u901A\u914D(\u672C\u7AEF\u628A\u6570\u5B57\u4E0B\u6807\u6620\u5C04\u4E3A '#' \u518D\u67E5); \u67E5\u4E0D\u5230 \u2192 editbox \u56DE\u843D\nconst IQ_SCHEMA_P = fetch('/api/iq-schema').then(r => r.json()).catch(() => null);\nlet IQ_SCHEMA = null;\nconst iqModOf = m => m.split('/').pop();            // \u5265\u573A\u666F\u524D\u7F00(normal/ae_calib \u2192 ae_calib; \u65E0 '/' \u539F\u6837)\nfunction iqMetaOf(module, path) {\n  const smod = iqModOf(module);\n  const sp = path.map(x => typeof x === 'number' ? '#' : x).join('/');\n  return (IQ_SCHEMA && IQ_SCHEMA[smod] && IQ_SCHEMA[smod][sp]) || null;\n}\n// \u975E\u8C03\u53C2\u9879\u6807\u6CE8(schema _meta.fixed, \u4F9D\u636E rk-isp-tune iq-json-key-params.md: datasheet \u786E\u8BA4\u5C42/\u7EDF\u8BA1\u914D\u5957/\n// \u6D4B\u8BD5\u8DEF\u5F84/\u6807\u5B9A\u4EA7\u7269): \u524D\u7F00\u5339\u914D\u6574\u5B50\u6811\u6216\u5355\u53F6 \u2192 \u539F\u56E0; \u53EA\u8BFB\u5C55\u793A key:value(\u4E0D\u51FA\u7F16\u8F91\u63A7\u4EF6), \u60AC\u505C\u770B\u539F\u56E0\nconst iqFixedOf = (module, path) => {\n  const fx = IQ_SCHEMA && IQ_SCHEMA._meta && IQ_SCHEMA._meta.fixed;\n  if (!fx) return null;\n  const s = iqModOf(module) + '/' + path.join('/');\n  for (const f in fx) if (s === f || s.startsWith(f + '/')) return fx[f];\n  return null;\n};\nfunction iqFixedRow(module, key, valStr, path, box) {  // \u9501\u5B9A\u9879\u63A5\u7BA1\u6E32\u67D3: \u53EA\u8BFB\u4E00\u884C; \u8FD4\u56DE\u662F\u5426\u5DF2\u63A5\u7BA1\n  const why = iqFixedOf(module, path);\n  if (!why) return false;\n  const row = document.createElement('div'); row.className = 'ctl iqe iqfix';\n  row.title = 'Read-only (non-tuning) \u2014 ' + why;\n  row.innerHTML = `<label>${escHtml(key)}<span class=\"v\">${escHtml(valStr)}</span></label>`;\n  box.appendChild(row);\n  return true;\n}\nconst iqFixVal = v => { const s = Array.isArray(v) ? '[' + v.join(',') + ']' : String(v);\n                        return s.length > 72 ? s.slice(0, 71) + '\u2026' : s; };  // \u957F\u6570\u7EC4(225 \u6743\u91CD\u7C7B)\u622A\u65AD\n// \u8DE8\u89C6\u56FE\u884C\u540C\u6B65(AEC quick \u9762\u677F\u4E0E IQ \u6811\u6E32\u67D3\u540C\u4E00\u53C2\u6570, \u5404\u6301\u63A7\u4EF6): iqMark \u767B\u8BB0\u540E\u628A\u503C\u63A8\u7ED9\u540C key \u5176\u5B83\u884C\nconst IQSYNC = new Map();                          // key(=iqEdits \u952E) \u2192 [{row, set}]\nconst iqRegSync = (module, path, row, orig, set) => {   // dirty \u5224\u5B9A\u6536\u53E3\u5728\u6B64, \u516D\u7C7B\u63A7\u4EF6\u8C03\u7528\u70B9\u53EA\u7BA1\u6446\u63A7\u4EF6\n  const k = module + '|' + path.join('.');\n  if (!IQSYNC.has(k)) IQSYNC.set(k, []);\n  IQSYNC.get(k).push({ row, set: v => { set(v);\n    row.classList.toggle('dirty', JSON.stringify(orig) !== JSON.stringify(v)); } });\n};\n// \u5DF2\u77E5\u679A\u4E3E(\u952E `\u7236\u952E/\u53F6\u952E` \u4F18\u5148\u4E8E\u88F8\u53F6\u952E): \u4E0B\u62C9(\u9009\u9879\u77ED\u540D); \u5F53\u524D\u503C\u4E0D\u5728\u6E05\u5355\u5185\u56DE\u843D editbox\nfunction iqMark(module, path, orig, val, row) {    // \u6539\u52A8\u767B\u8BB0(\u8FD8\u539F\u5230\u539F\u503C\u81EA\u52A8\u64A4\u9500) + \u26A1Live \u5F85\u53D1\u70ED\u5E94\u7528\n  const key = module + '|' + path.join('.');\n  const patch = { module, path, value: val };\n  if (JSON.stringify(orig) === JSON.stringify(val)) {\n    iqEdits.delete(key); row.classList.remove('dirty');\n    schedHot(key, patch);                          // \u8FD8\u539F\u4E5F\u987B\u70ED\u56DE\u9000: \u5F15\u64CE\u6301\u6709\u5DF2\u5E94\u7528\u503C, \u4E0D\u53D1=UI/\u5F15\u64CE\u9759\u9ED8\u5206\u6B67\n  }\n  else { iqEdits.set(key, patch); row.classList.add('dirty'); schedHot(key, patch); }\n  const regs = IQSYNC.get(key);                    // \u540C\u53C2\u6570\u53E6\u4E00\u89C6\u56FE\u884C\u540C\u6B65\u663E\u793A(\u503C+dirty)\n  if (regs) for (const r of regs)\n    if (r.row !== row && r.row.isConnected) r.set(val);\n  iqSaveBar();\n}\n// \u6298\u53E0\u6001\u6301\u4E45\u5316(localStorage 'rkIqOpen'): \u952E=\u7EC4 id(\u6A21\u5757|\u8DEF\u5F84 / @\u9876\u5C42\u952E / aec:*), \u503C=\u5F00\u5408\u7EDD\u5BF9\u6001\nlet IQOPEN = {};\ntry { const v = JSON.parse(localStorage.getItem('rkIqOpen') || '{}'); if (v && typeof v === 'object') IQOPEN = v; } catch {}\nconst iqOpenSave = () => { try { localStorage.setItem('rkIqOpen', JSON.stringify(IQOPEN)); } catch {} };\n\nconst isHotMod = m => !!(IQ_SCHEMA && IQ_SCHEMA._meta && IQ_SCHEMA._meta.hot_prefixes\n  && IQ_SCHEMA._meta.hot_prefixes.some(p => m.startsWith(p)));   // \u6E90\u7801 mapModStrListToEnum \u524D\u7F00\u8868(\u7ECF schema \u4E0B\u53D1)\nfunction iqGroup(title, open, buildFn, id, hot) {  // \u6298\u53E0\u7EC4; buildFn=\u61D2\u6784\u5EFA; id=\u6298\u53E0\u6001\u6301\u4E45\u5316\u952E; hot=\u7EFF\u8272\u70ED\u66F4\u65B0\u6807\u8BB0\n  if (id && id in IQOPEN) open = IQOPEN[id];       // \u6301\u4E45\u6001\u4F18\u5148\u4E8E\u9ED8\u8BA4\n  const el = document.createElement('div'); el.className = 'iqnode';\n  const head = document.createElement('div');\n  head.className = 'iqnhead' + (hot ? ' iqhot' : '');\n  if (hot) head.title = 'Hot-updatable: unix-socket calib patch takes effect immediately (lost on reboot; Push to persist)';\n  head.textContent = (open ? '\u25BE ' : '\u25B8 ') + title;\n  const body = document.createElement('div'); body.className = 'iqnbody';\n  body.style.display = open ? 'block' : 'none';\n  let built = !buildFn;\n  if (buildFn && open) { built = true; const bfn = buildFn;\n    setTimeout(() => bfn(), 0); }   // \u5F02\u6B65\u4E00\u62CD: \u6784\u9020\u671F\u540C\u6B65\u8C03 buildFn \u4F1A\u649E\u8C03\u7528\u65B9 const \u7684 TDZ(g2.body \u81EA\u5F15\u7528)\n  head.onclick = () => {\n    const o = body.style.display !== 'none';\n    if (o) { body.style.display = 'none'; head.textContent = '\u25B8 ' + title; }\n    else { if (!built) { built = true; buildFn(); } body.style.display = 'block'; head.textContent = '\u25BE ' + title; }\n    if (id) { IQOPEN[id] = !o; iqOpenSave(); }\n  };\n  el.appendChild(head); el.appendChild(body);\n  return { el, body };\n}\nfunction iqLeaf(module, key, val, path, box) {               // \u6807\u91CF\u53F6: \u6309\u7C7B\u578B\u51FA\u63A7\u4EF6\n  if (iqFixedRow(module, key, String(val), path, box)) return;\n  const row = document.createElement('div'); row.className = 'ctl iqe';\n  const mark = v => iqMark(module, path, val, v, row);\n  const meta = iqMetaOf(module, path);            // schema \u5143\u6570\u636E(\u51FD\u6570\u7EA7\u4F5C\u7528\u57DF: number/string \u4E24\u5206\u652F\u5171\u7528)\n  let sync;                                       // \u8DE8\u89C6\u56FE\u663E\u793A\u540C\u6B65(\u5206\u652F\u5404\u81EA\u5B9A\u4E49, \u7EDF\u4E00\u6CE8\u518C)\n  if (typeof val === 'boolean') {\n    const lb = document.createElement('label'); lb.className = 'chk';\n    const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = val;\n    cb.onchange = () => mark(cb.checked);\n    lb.appendChild(cb); lb.appendChild(document.createTextNode(' ' + key));\n    row.appendChild(lb);\n    sync = v => { cb.checked = !!v; };\n  } else if (typeof val === 'number') {\n    const rg = meta && meta.r ? [meta.r[0], meta.r[1], meta.s || (Number.isInteger(val) ? 1 : .01)] : null;\n    if (rg) {\n      row.innerHTML = `<label>${escHtml(key)}<span class=\"v\">${val}</span></label>`;\n      const vs = row.querySelector('.v');\n      const inp = document.createElement('input'); inp.type = 'range';\n      inp.min = rg[0]; inp.max = rg[1]; inp.step = rg[2]; inp.value = val;\n      inp.oninput = () => { vs.textContent = inp.value; mark(+inp.value); };\n      row.appendChild(inp);\n      sync = v => { inp.value = v; vs.textContent = v; };\n    } else {\n      row.innerHTML = `<label>${escHtml(key)}</label>`;\n      const inp = document.createElement('input'); inp.type = 'text'; inp.value = val;\n      inp.onchange = () => {\n        const v = parseFloat(inp.value);\n        if (isNaN(v)) { inp.value = val; clog(`iq: ${key} not a number, reverted`, 'err'); return; }\n        mark(v);\n      };\n      row.appendChild(inp);\n      sync = v => { inp.value = v; };\n    }\n  } else {                                         // string: \u5DF2\u77E5\u679A\u4E3E \u2192 radio/select, \u5426\u5219 editbox\n    const opts = meta && meta.e;                          // schema: \u679A\u4E3E \u2192 \u4E0B\u62C9(\u9009\u9879\u77ED\u540D, \u60AC\u505C\u770B\u5168\u540D)\n    row.innerHTML = `<label>${escHtml(key)}</label>`;\n    if (opts && opts.includes(val)) {                   // \u5DF2\u77E5\u679A\u4E3E \u2192 \u4E0B\u62C9(\u9009\u9879\u77ED\u540D, \u60AC\u505C\u770B\u5168\u540D)\n      const short = o => o.replace(/^.*_/, '');\n      const sel = document.createElement('select');\n      for (const o of opts) sel.appendChild(Object.assign(document.createElement('option'),\n        { value: o, textContent: short(o), title: o }));\n      sel.value = val;\n      sel.onchange = () => mark(sel.value);\n      row.appendChild(sel);\n      sync = v => { sel.value = v; };\n    } else {\n      const inp = document.createElement('input'); inp.type = 'text'; inp.value = val;\n      inp.onchange = () => mark(inp.value.trim());\n      row.appendChild(inp);\n      sync = v => { inp.value = v; };\n    }\n  }\n  iqRegSync(module, path, row, val, sync);\n  box.appendChild(row);\n}\n// Gamma_curve(49 \u70B9, X \u8F74\u56FA\u5B9A\u8868\u6765\u81EA Tuning Guide \xA74.7.2.3, \u5BF9\u6570\u758F\u5BC6) \u2192 \u53EF\u62D6\u62FD\u66F2\u7EBF\u7F16\u8F91\u5668\nconst GAMMA_X = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64,\n                 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 448, 512, 640, 768, 896, 1024,\n                 1280, 1536, 1792, 2048, 2304, 2560, 2816, 3072, 3328, 3584, 3840, 4095];\nfunction iqCurveRow(module, key, val, path, box) {\n  const row = document.createElement('div'); row.className = 'ctl iqe';   // \u9501\u5B9A\u68C0\u67E5\u5728 iqArrayRow \u5165\u53E3\n  row.innerHTML = `<label>${escHtml(key)}<span class=\"v\">${val.length} pts \xB7 drag points to edit</span></label>`;\n  const info = row.querySelector('.v');\n  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');\n  svg.setAttribute('viewBox', '0 0 1000 320');\n  svg.setAttribute('preserveAspectRatio', 'none');          // \u7EBF\u6027\u62C9\u4F38: \u6307\u9488\u2194viewBox \u5750\u6807\u53EF\u76F4\u7EBF\u6362\u7B97\n  svg.style.cssText = 'width:100%;height:130px;background:#101216;'\n                    + 'border:1px solid #2e333d;border-radius:4px;touch-action:none;cursor:crosshair';\n  const W = 1000, H = 320, PAD = 8;\n  const px = i => PAD + (GAMMA_X[i] / 4095) * (W - 2 * PAD);   // X \u6309\u56FA\u5B9A\u8868\u771F\u503C\u6620\u5C04(\u975E\u5747\u5300\u7D22\u5F15)\n  const py = v => PAD + (1 - v / 4095) * (H - 2 * PAD);\n  const mk = (tag, attrs) => { const el = document.createElementNS('http://www.w3.org/2000/svg', tag);\n    for (const k in attrs) el.setAttribute(k, attrs[k]); return el; };\n  const poly = mk('polyline', { fill: 'none', stroke: '#6fb3ff', 'stroke-width': 2,\n                                'vector-effect': 'non-scaling-stroke' });\n  const dots = val.map((v, i) => mk('circle', { cx: px(i), cy: py(v), r: 5, fill: '#6fb3ff' }));\n  const redraw = arr => { poly.setAttribute('points', arr.map((v, i) => px(i) + ',' + py(v)).join(' '));\n                          arr.forEach((v, i) => dots[i].setAttribute('cy', py(v))); };\n  redraw(val);\n  svg.appendChild(poly); dots.forEach(d => svg.appendChild(d));\n  const cur = [...val];\n  let dragI = -1;\n  const idxOf = xN => { const x = xN * 4095; let best = 0, bd = 1e9;   // \u6700\u8FD1 X \u91C7\u6837\u70B9\n    for (let i = 0; i < GAMMA_X.length; i++) { const d = Math.abs(GAMMA_X[i] - x);\n      if (d < bd) { bd = d; best = i; } } return best; };\n  svg.addEventListener('pointerdown', e => {\n    const r = svg.getBoundingClientRect();\n    dragI = idxOf((e.clientX - r.left) / r.width);\n    svg.setPointerCapture(e.pointerId);\n  });\n  svg.addEventListener('pointermove', e => {\n    if (dragI < 0) return;\n    const r = svg.getBoundingClientRect();\n    const v = Math.max(0, Math.min(4095, Math.round((1 - (e.clientY - r.top) / r.height) * 4095)));\n    cur[dragI] = v; redraw(cur);\n    info.textContent = `#${dragI} x=${GAMMA_X[dragI]} \u2192 y=${v}`;\n    iqMark(module, path, val, [...cur], row);               // \u4E0E\u5176\u5B83\u63A7\u4EF6\u540C\u4E00\u6761 dirty/push \u94FE\n  });\n  const up = () => { dragI = -1; };\n  svg.addEventListener('pointerup', up);\n  svg.addEventListener('pointercancel', up);\n  iqRegSync(module, path, row, val,\n    v => { cur.splice(0, cur.length, ...v); redraw(cur); });\n  row.appendChild(svg);\n  box.appendChild(row);\n}\n// ---- \u901A\u7528\u66F2\u7EBF\u7EC4: \u540C\u7236\u5BF9\u8C61\u4E0B\u7B49\u957F\u6570\u503C\u6570\u7EC4(1 \u6761 X + N \u6761 Y)\u2192 \u591A\u7CFB\u5217\u53EF\u62D6\u62FD\u66F2\u7EBF(Y \u7CFB\u5217\u9017\u53F7\u6846\u88AB\u53D6\u4EE3, X \u6846\u4FDD\u7559) ----\nconst IQ_X_KEYS = new Set(['ExpLevel', 'LExpLevel', 'MExpLevel', 'SExpLevel', 'ISO', 'Iso', 'iso',\n                           'OEpdf', 'gains', 'gain', 'lumaValue', 'lumapoint', 'luma_point', 'cct']);\nconst IQ_COLORS = ['#6fb3ff', '#6ecf7e', '#fbbf24', '#e07070', '#b48ead', '#67c3e8'];\nfunction iqCurveInfo(obj) {                       // \u76F4\u63A5\u5B50\u6570\u7EC4\u91CC\u6311 X: \u5DF2\u77E5\u952E\u540D\u4F18\u5148, \u5426\u5219\u9996\u4E2A\u4E25\u683C\u9012\u589E(\u957F\u5EA6\u22656)\n  const arrs = Object.entries(obj).filter(([, v]) =>\n    Array.isArray(v) && v.length >= 4 && v.every(x => typeof x === 'number'));\n  if (arrs.length < 2) return null;\n  let x = arrs.find(([k]) => IQ_X_KEYS.has(k));\n  if (!x) x = arrs.find(([, v]) => v.length >= 6 && v.every((a, i) => i === 0 || a > v[i - 1]));\n  if (!x) return null;\n  const ys = arrs.filter(([k, v]) => k !== x[0] && v.length === x[1].length);\n  return ys.length ? { x, ys } : null;\n}\nfunction iqCurveGroup(module, path, obj, box) {    // \u6E32\u67D3\u591A\u7CFB\u5217\u66F2\u7EBF(\u62D6\u4EFB\u610F\u7CFB\u5217\u7684\u70B9); \u8FD4\u56DE\u5DF2\u6D88\u8D39\u7684 Y \u952E\u96C6\n  const ci = iqCurveInfo(obj);\n  if (!ci) return null;\n  const [xk, xv] = ci.x;\n  if (iqFixedRow(module, path[path.length - 1] || '', `${ci.ys.length} series \xD7 ${xv.length} pts`, path, box))\n    return new Set(ci.ys.map(([k]) => k));         // \u53EA\u8BFB\u4E5F\u6D88\u8D39 Y \u952E(\u514D iqTree \u518D\u9010\u6761\u6E32\u67D3)\n  const row = document.createElement('div'); row.className = 'ctl iqe';\n  row.innerHTML = `<label>${escHtml(path.length ? path[path.length - 1] : '')} \xB7 x=${escHtml(xk)}<span class=\"v\"></span></label>`;\n  const info = row.querySelector('.v');\n  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');\n  svg.setAttribute('viewBox', '0 0 1000 260');\n  svg.setAttribute('preserveAspectRatio', 'none');\n  svg.style.cssText = 'width:100%;height:110px;background:#101216;'\n                    + 'border:1px solid #2e333d;border-radius:4px;touch-action:none;cursor:crosshair';\n  const W = 1000, H = 260, PAD = 8;\n  const xmin = Math.min(...xv), xmax = Math.max(...xv);\n  const useLog = xv.every(v => v > 0) && xmax / xmin > 100;   // ISO \u7C7B\u8DE8 decade \u2192 \u5BF9\u6570 X\n  const lg = v => Math.log10(v);\n  const xn = v => useLog ? (lg(v) - lg(xmin)) / (lg(xmax) - lg(xmin) || 1) : (v - xmin) / (xmax - xmin || 1);\n  const px = i => PAD + xn(xv[i]) * (W - 2 * PAD);\n  let ymin = Infinity, ymax = -Infinity;\n  for (const [, v] of ci.ys) for (const y of v) { ymin = Math.min(ymin, y); ymax = Math.max(ymax, y); }\n  if (ymin === ymax) { ymin -= 1; ymax += 1; }\n  const pad = (ymax - ymin) * .05; ymin -= pad; ymax += pad;\n  const py = v => PAD + (1 - (v - ymin) / (ymax - ymin)) * (H - 2 * PAD);\n  const mk = (tag, attrs) => { const el = document.createElementNS('http://www.w3.org/2000/svg', tag);\n    for (const k in attrs) el.setAttribute(k, attrs[k]); return el; };\n  const orig = ci.ys.map(([, v]) => v);\n  const cur = ci.ys.map(([, v]) => [...v]);\n  const isInt = orig.every(a => a.every(x => Number.isInteger(x)));\n  const elems = ci.ys.map((sy, si) => {\n    const c = IQ_COLORS[si % IQ_COLORS.length];\n    const poly = mk('polyline', { fill: 'none', stroke: c, 'stroke-width': 2,\n                                  'vector-effect': 'non-scaling-stroke' });\n    const dots = sy[1].map((v, i) => mk('circle', { cx: px(i), cy: py(v), r: 5, fill: c }));\n    return { poly, dots };\n  });\n  const redraw = () => elems.forEach((e, si) => {\n    e.poly.setAttribute('points', cur[si].map((v, i) => px(i) + ',' + py(v)).join(' '));\n    cur[si].forEach((v, i) => e.dots[i].setAttribute('cy', py(v)));\n  });\n  redraw();\n  ci.ys.forEach(([yk], si) => iqRegSync(module, [...path, yk], row, orig[si],    // \u9010\u7CFB\u5217\u540C\u6B65(\u952E=\u62D6\u70B9 iqMark \u952E)\n    v => { cur[si].splice(0, cur[si].length, ...v); redraw(); }));\n  svg.appendChild(mk('line', { x1: 0, y1: H - PAD, x2: W, y2: H - PAD, stroke: '#2e333d',\n                              'vector-effect': 'non-scaling-stroke' }));   // X \u57FA\u7EBF\n  for (const e of elems) { svg.appendChild(e.poly); e.dots.forEach(d => svg.appendChild(d)); }\n  let drag = null;                                  // {si, pi}\n  const pick = (cx, cy) => {                        // \u5168\u7CFB\u5217\u6700\u8FD1\u70B9(\u50CF\u7D20\u8DDD\u79BB)\n    const r = svg.getBoundingClientRect();\n    let best = null, bd = 1e9;\n    elems.forEach((e, si) => e.dots.forEach((d, pi) => {\n      const dx = (d.cx.baseVal.value / W) * r.width - cx, dy = (d.cy.baseVal.value / H) * r.height - cy;\n      const dd = dx * dx + dy * dy;\n      if (dd < bd) { bd = dd; best = { si, pi }; }\n    }));\n    return best;\n  };\n  svg.addEventListener('pointerdown', e => {\n    const r = svg.getBoundingClientRect();\n    drag = pick(e.clientX - r.left, e.clientY - r.top);\n    if (drag) svg.setPointerCapture(e.pointerId);\n  });\n  svg.addEventListener('pointermove', e => {\n    if (!drag) return;\n    const r = svg.getBoundingClientRect();\n    let v = ymin + (1 - (e.clientY - r.top) / r.height) * (ymax - ymin);\n    v = Math.max(ymin, Math.min(ymax, isInt ? Math.round(v) : Math.round(v * 1000) / 1000));\n    cur[drag.si][drag.pi] = v; redraw();\n    info.textContent = `${ci.ys[drag.si][0]}[${drag.pi}] x=${xv[drag.pi]} \u2192 ${v}`;\n    iqMark(module, [...path, ci.ys[drag.si][0]], orig[drag.si], [...cur[drag.si]], row);\n  });\n  const up = () => { drag = null; };\n  svg.addEventListener('pointerup', up);\n  svg.addEventListener('pointercancel', up);\n  row.appendChild(svg);\n  box.appendChild(row);\n  return new Set(ci.ys.map(([k]) => k));\n}\n// \u77E9\u9635\u5F62\u6570\u7EC4(\u952E\u540D\u542B matrix, \u957F\u5EA6 9/16 \u2192 3\xD73/4\xD74)\u2192 \u7F51\u683C\u7F16\u8F91\u5668, \u884C\u5217\u6807\u7B7E R/G/B\nfunction iqMatrixRow(module, key, val, path, box) {\n  const n = Math.round(Math.sqrt(val.length));\n  const lbl = key === 'ccMatrix' ? ['R', 'G', 'B'] : null;      // \u53EA\u6709 CCM \u884C\u5217\u90FD\u662F RGB; rotationMat \u884C\u662F TCS \u8F74, \u4E0D\u6807\u9632\u8BEF\u5BFC\n  const row = document.createElement('div'); row.className = 'ctl iqe';   // \u9501\u5B9A\u68C0\u67E5\u5728 iqArrayRow \u5165\u53E3\n  row.innerHTML = `<label>${escHtml(key)}<span class=\"v\">${n}\xD7${n}</span></label>`;\n  const grid = document.createElement('div'); grid.className = 'iqm';\n  grid.style.gridTemplateColumns = `repeat(${n + (lbl ? 1 : 0)}, 1fr)`;   // \u65E0\u6807\u7B7E\u77E9\u9635\u4E0D\u5E26\u6807\u7B7E\u5217(\u514D\u5DE6\u4FA7\u7A7A\u767D\u5E26)\n  const cell = (t) => { const e = document.createElement('span'); e.className = 'iqml';\n                        if (t) e.textContent = t; return e; };\n  const cur = [...val];\n  const cells = [];                                     // \u8DE8\u89C6\u56FE\u540C\u6B65\u7528(\u683C\u8F93\u5165\u6846\u5E8F=\u6570\u7EC4\u5E8F)\n  if (lbl) {                                                   // \u8868\u5934\u884C\u6052\u5360\u6EE1\u6574\u884C(\u5426\u5219 grid \u81EA\u52A8\u5E03\u5C40\u628A\u6570\u636E\u6324\u4E0A\u8868\u5934\u884C)\n    grid.appendChild(cell(''));\n    for (let i = 0; i < n; i++) grid.appendChild(cell(lbl[i]));\n  }\n  for (let r = 0; r < n; r++) {\n    if (lbl) grid.appendChild(cell(lbl[r]));                   // \u884C\u6807\u5217\n    for (let cIdx = 0; cIdx < n; cIdx++) {\n      const inp = document.createElement('input'); inp.type = 'text';\n      inp.value = val[r * n + cIdx];\n      inp.onchange = () => {                       // \u5355\u683C\u7F16\u8F91 \u2192 \u6574\u6570\u7EC4\u8FDB dirty \u94FE\n        const v = parseFloat(inp.value);\n        if (isNaN(v)) { inp.value = cur[r * n + cIdx]; clog(`iq: ${key}[${r}][${cIdx}] not a number, reverted`, 'err'); return; }\n        cur[r * n + cIdx] = Math.round(v * 1e6) / 1e6;\n        iqMark(module, path, val, [...cur], row);\n      };\n      grid.appendChild(inp);\n      cells.push(inp);\n    }\n  }\n  iqRegSync(module, path, row, val,\n    v => v.forEach((x, i) => { if (cells[i]) cells[i].value = x; }));\n  row.appendChild(grid);\n  box.appendChild(row);\n}\n// ---- AEC \u4E94\u6B65\u5FEB\u901F\u8C03\u8BD5(Tuning Guide \xA74.1.3 \u6B65\u9AA4\u5E8F): \u7B56\u5C55\u9762\u677F, \u4E0E\u6811\u5171\u7528\u540C\u4E00 dirty/Push \u94FE ----\nfunction iqWeightGrid(module, key, val, path, box) {     // 15\xD715 \u6D4B\u5149\u6743\u91CD: \u753B\u7B14\u6D82\u5237\u70ED\u529B\u56FE\n  const cur = [...val];\n  const PEN_MAX = 32;                                   // \u6E90\u7801 M4_RANGE(0,32)/u8 (iq_parser_v2/aec_head.h); 0=\u4E0D\u8BA1\u5165\u6D4B\u5149\n  if (iqFixedRow(module, key, '15\xD715 weights', path, box)) return;\n  const row = document.createElement('div'); row.className = 'ctl iqe';\n  row.innerHTML = `<label>${escHtml(key)}<span class=\"v\">15\xD715</span></label>`;\n  const info = row.querySelector('.v');\n  const sel = document.createElement('select');          // \u753B\u7B14\u6743\u91CD\n  for (let i = 0; i <= PEN_MAX; i++) sel.appendChild(Object.assign(document.createElement('option'),\n    { value: i, textContent: 'pen ' + i }));\n  sel.value = Math.max(...cur);\n  const grid = document.createElement('div'); grid.className = 'iqw';\n  grid.style.gridTemplateColumns = 'repeat(15, 1fr)';\n  let painting = false;\n  const renders = [];                                    // \u6574\u56FE\u91CD\u7740\u8272: \u5F52\u4E00\u57FA\u51C6\u53D8\u4E86, \u6240\u6709\u683C\u8272\u9636\u540C\u6B65\n  val.forEach((w0, i) => {\n    const c = document.createElement('div'); c.className = 'iqwc';\n    const render = () => { const m = Math.max(1, ...cur);\n      c.textContent = cur[i];\n      c.style.background = `rgba(111,179,255,${(cur[i] / m * .8).toFixed(2)})`; };\n    render(); renders.push(render);\n    const setc = () => { if (cur[i] === +sel.value) return;\n      cur[i] = +sel.value; renders.forEach(r => r());\n      info.textContent = `[${i % 15},${i / 15 | 0}] \u2192 ${cur[i]}`;\n      iqMark(module, path, val, [...cur], row); };\n    c.onpointerdown = e => { e.preventDefault(); painting = true; setc(); };\n    c.onpointerenter = () => { if (painting) setc(); };\n    grid.appendChild(c);\n  });\n  const stop = () => { painting = false; };\n  grid.addEventListener('pointerup', stop);\n  grid.addEventListener('pointerleave', stop);\n  iqRegSync(module, path, row, val,\n    v => { cur.splice(0, cur.length, ...v); renders.forEach(r => r()); });\n  row.appendChild(sel);\n  row.appendChild(grid);\n  box.appendChild(row);\n}\nlet aecBoxOpen = IQOPEN['aec:box'] !== false;   // AEC \u6846\u9ED8\u8BA4\u5C55\u5F00(\u6536\u8D77\u8FC7\u624D\u8BB0 false)               // AEC \u6846\u6298\u53E0\u6001(\u6301\u4E45\u5316, \u9ED8\u8BA4\u5F00)\nlet aecStepOpen = Array.isArray(IQOPEN['aec:steps']) && IQOPEN['aec:steps'].length === 5\n  ? [...IQOPEN['aec:steps']] : [true, true, true, true, true];   // \u4E94\u6B65\u9ED8\u8BA4\u5C55\u5F00(\u6536\u8D77\u8FC7\u624D\u8BB0)\nfunction aecToggleBox() {\n  aecBoxOpen = !aecBoxOpen;\n  IQOPEN['aec:box'] = aecBoxOpen; iqOpenSave();\n  $('aecBody').style.display = aecBoxOpen ? 'block' : 'none';\n  $('aecChev').textContent = aecBoxOpen ? '\u25BE' : '\u25B8';\n}\nfunction buildAecQuick(rw, host) {                       // \u4E94\u6B65(Guide \xA74.1.3 \u6B65\u9AA4\u5E8F), \u5404\u6B65\u72EC\u7ACB\u6298\u53E0\n  const sc0 = rw.main_scene && rw.main_scene[0];                 // \u9996\u573A\u666F\u7684 ae_calib(\u6A21\u5757\u8EAB\u4EFD\u5E26\u573A\u666F\u524D\u7F00)\n  const ss0 = sc0 && sc0.sub_scene && sc0.sub_scene[0];\n  const ispK = ss0 && Object.keys(ss0).find(x => /^scene_isp/.test(x));\n  const AEM = sc0 ? `${sc0.name}/ae_calib` : 'ae_calib';\n  const ae = (ss0 && ispK && ss0[ispK].ae_calib) || {}, sc = rw.sensor_calib || {};\n  const at = (o, ks) => ks.reduce((a, k) => (a == null ? undefined : a[k]), o);\n  const leafAt = (mod, root, keys, box) => {             // \u6309 json \u8DEF\u5F84\u51FA\u6807\u51C6\u63A7\u4EF6(\u4E0E\u6811\u540C\u6B3E)\n    const v = at(root, keys);\n    if (v === undefined || v === null || typeof v === 'object') return;\n    iqLeaf(mod, keys[keys.length - 1], v, [...keys], box);\n  };\n  const steps = [\n    { t: '\u2460 Sensor exposure (sensorinfo)', build: box => {\n        for (const rg of ['CISAgainRange', 'CISDgainRange'])\n          for (const mm of ['Min', 'Max']) leafAt('sensor_calib', sc, ['CISGainSet', rg, mm], box);\n        for (const d of ['time_update', 'gain_update']) leafAt('sensor_calib', sc, ['CISExpUpdate', 'Linear', d], box);\n        leafAt('sensor_calib', sc, ['CISMinFps'], box);\n      } },\n    { t: '\u2461 AE metering weights (15\xD715)', build: box => {\n        const wg = at(ae, ['CommCtrl', 'AecGridWeight']);\n        if (Array.isArray(wg) && wg.length === 225 && wg.every(x => typeof x === 'number'))\n          iqWeightGrid(AEM, 'AecGridWeight', wg, ['CommCtrl', 'AecGridWeight'], box);\n      } },\n    { t: '\u2462 AE exposure split (Route)', build: box => {\n        for (const k of ['TimeDot', 'GainDot']) {\n          const v = at(ae, ['LinearAeCtrl', 'Route', k]);\n          if (Array.isArray(v)) iqArrayRow(AEM, k, v, ['LinearAeCtrl', 'Route', k], box);\n        }\n      } },\n    { t: '\u2463 AE target luma (DySetpoint)', build: box => {\n        const dy = at(ae, ['LinearAeCtrl', 'DySetpoint']);\n        if (dy && typeof dy === 'object') iqCurveGroup(AEM, ['LinearAeCtrl', 'DySetpoint'], dy, box);\n        for (const k of ['ToleranceIn', 'ToleranceOut']) leafAt(AEM, ae, ['LinearAeCtrl', k], box);\n      } },\n    { t: '\u2464 AE convergence speed', build: box => {\n        leafAt(AEM, ae, ['CommCtrl', 'AecRunInterval'], box);\n        for (const k of ['DampOver', 'DampUnder', 'DampDark2Bright', 'DampBright2Dark'])\n          leafAt(AEM, ae, ['CommCtrl', 'AecSpeed', k], box);\n      } },\n  ];\n  steps.forEach((st, i) => {\n    const g = iqGroup(st.t, aecStepOpen[i]);\n    g.el.firstChild.addEventListener('click', () => { aecStepOpen[i] = !aecStepOpen[i];\n      IQOPEN['aec:steps'] = aecStepOpen; iqOpenSave(); });  // \u6298\u53E0\u6001\u6301\u4E45\u5316\n    st.build(g.body);\n    host.appendChild(g.el);\n  });\n}\nfunction iqArrayRow(module, key, val, path, box) { // \u57FA\u5143\u6570\u7EC4: \u9017\u53F7\u6846(\u9501\u5143\u7D20\u4E2A\u6570, \u9632\u6539\u5D29 schema)\n  if (iqFixedRow(module, key, iqFixVal(val), path, box)) return;  // \u9501\u5B9A\u9879\u53EA\u8BFB(\u5148\u4E8E\u66F2\u7EBF/\u77E9\u9635\u63A5\u7BA1)\n  if (key === 'Gamma_curve' && val.length === 49 && val.every(x => typeof x === 'number'))\n    return iqCurveRow(module, key, val, path, box);         // 49 \u70B9 gamma \u8D70\u66F2\u7EBF\u7F16\u8F91\u5668\n  if ((key === 'ccMatrix' || key === 'rgb2RotationYuvMat' || key === 'rotationMat')  // \u767D\u540D\u5355: \u771F\u77E9\u9635(\u5168\u6A21\u5757\u626B\u63CF\u6838\u5B9E\u5C31\u8FD9\u4E09\u4E2A);\n      && val.every(x => typeof x === 'number'))                 // lumaValueMatrix \u7B49\u662F\u65AD\u70B9/\u6743\u91CD\u5411\u91CF, \u4E0D\u8FDB\u7F51\u683C\n    return iqMatrixRow(module, key, val, path, box);\n  const row = document.createElement('div'); row.className = 'ctl iqe';\n  row.innerHTML = `<label>${escHtml(key)}<span class=\"v\">${val.length}</span></label>`;\n  const inp = document.createElement('input'); inp.type = 'text';\n  inp.value = val.join(',');\n  const isNum = val.every(x => typeof x === 'number');\n  inp.onchange = () => {\n    const parts = inp.value.split(',').map(s => s.trim());\n    if (parts.length !== val.length) {\n      inp.value = val.join(',');\n      clog(`iq: ${key} must keep ${val.length} elements (values only, not length)`, 'err'); return;\n    }\n    if (isNum && parts.some(s => s === '' || isNaN(+s))) {\n      inp.value = val.join(','); clog(`iq: ${key} has non-number entries, reverted`, 'err'); return;\n    }\n    iqMark(module, path, val, isNum ? parts.map(Number) : parts, row);\n  };\n  row.appendChild(inp);\n  iqRegSync(module, path, row, val, v => { inp.value = v.join(','); });\n  box.appendChild(row);\n}\nfunction iqTree(module, obj, path, box, skip) {          // \u9012\u5F52\u6E32\u67D3(\u4E25\u683C\u7ED3\u6784; *_len=\u5E8F\u5217\u5316\u5197\u4F59\u957F\u5EA6, \u9690\u85CF; null/\u7A7A\u6570\u7EC4\u539F\u6837\u53EF\u89C1)\n  for (const k of Object.keys(obj)) {\n    if (/_len$/.test(k) || (skip && skip.has(k))) continue;\n    const v = obj[k];\n    const p = [...path, k];\n    if (v === null) {                                     // null \u503C: \u539F\u6837\u53EF\u89C1\n      const n = document.createElement('div'); n.className = 'note';\n      n.textContent = `${k} = null`;\n      box.appendChild(n); continue;\n    }\n    const open = IQ_OPEN.has(module + ':' + p.join('.'));  // \u9ED8\u8BA4\u6536\u8D77, \u4EC5\u5173\u952E\u7EC4\u767D\u540D\u5355\u5C55\u5F00\n    if (Array.isArray(v)) {\n      if (!v.length) continue;                            // \u7A7A\u6570\u7EC4: \u65E0\u5185\u5BB9, \u9690\u85CF(\u4E0E *_len \u540C\u7B56)\n      if (v.every(x => x === null || typeof x !== 'object')) {\n        if (v.length === v.filter(x => x !== null).length) { iqArrayRow(module, k, v, p, box); continue; }\n      }\n      const g = iqGroup(`${k}[${v.length}]`, open, null, module + '|' + p.join('/'));  // \u5BF9\u8C61\u6570\u7EC4: \u5143\u7D20\u5404\u6210\u5B50\u7EC4\n      v.forEach((x, i) => {\n        if (x !== null && typeof x === 'object') {\n          const g2 = iqGroup(`#${i}`, false, null, module + '|' + [...p, i].join('/'));\n          iqTree(module, x, [...p, i], g2.body);\n          g.body.appendChild(g2.el);\n        }\n      });\n      box.appendChild(g.el);\n    } else if (typeof v === 'object') {\n      const g = iqGroup(k, open, null, module + '|' + p.join('/'));\n      const consumed = iqCurveGroup(module, p, v, g.body);   // \u66F2\u7EBF\u7EC4\u7F6E\u9876(Y \u9017\u53F7\u6846\u88AB\u53D6\u4EE3)\n      iqTree(module, v, p, g.body, consumed);\n      box.appendChild(g.el);\n    } else {\n      iqLeaf(module, k, v, p, box);\n    }\n  }\n}\nfunction iqSaveBar() {                            // push \u6309\u94AE\u627F\u8F7D dirty \u6001(\u8BA1\u6570+\u7425\u73C0\u9AD8\u4EAE)\n  const b = $('iqBtnPush');\n  if (!b) return;\n  b.textContent = iqEdits.size ? `Push\xB7${iqEdits.size}` : 'Push';\n  b.classList.toggle('dirty', !!iqEdits.size);\n}\nasync function iqRestore() {                      // \u4ECE\u677F\u4E0A\u6700\u8FD1 .bak-MMDD \u6062\u590D(\u8986\u76D6\u73B0\u6587\u4EF6, \u91CD\u542F 3A \u751F\u6548)\n  const file = iqLoadedName.split('/').pop();\n  if (!file) return;\n  if (!confirm(`Restore ${file} from latest backup?\\n\\nBoard file will be overwritten by .bak\\nTakes effect after 3A restart (systemctl restart rkaiq_3A)`)) return;\n  try {\n    const r = await post('/api/iq/restore', {});\n    if (r.ok) { clog(`iq: restored ${file} \u2190 ${r.restored} \u2014 restart 3A to take effect: systemctl restart rkaiq_3A`, 'ok');\n               loadIq(); }                        // \u6062\u590D\u540E\u91CD\u62C9(\u6811=\u5907\u4EFD\u5185\u5BB9, \u672C\u5730\u672A\u4FDD\u5B58\u6539\u52A8\u4F5C\u5E9F)\n    else clog(`iq: restore failed \u2014 ${r.error}`, 'err');\n  } catch (e) { clog(`iq: restore failed \u2014 ${e}`, 'err'); }\n}\n// \u26A1 Live: \u4FEE\u6539\u5373\u70ED\u5E94\u7528 \u2014\u2014 iqMark \u6536\u5230\u6539\u52A8\u5373\u5165\u5F85\u53D1\u96C6, 500ms \u9632\u6296\u6512\u6279\u4E00\u6761 socket \u8FDE\u63A5\u53D1\u5B8C;\n//   promise \u94FE\u4E32\u884C(unix socket \u5355\u5BA2\u6237\u7AEF, \u5E76\u53D1\u8FDE\u63A5\u4F1A\u9759\u9ED8\u4E22); \u901A\u9053\u51FA\u9519\u81EA\u52A8\u5173 Live \u515C\u5E95\nlet iqLive = true;\ntry { iqLive = localStorage.getItem('rkIqLive') !== '0'; } catch {}\nlet hotT = 0;\nconst pendingHot = new Map();                     // key\u2192patch \u7EC8\u503C: \u8FD8\u539F\u64A4\u9500\u7684\u952E\u5DF2\u4E0D\u5728 iqEdits, \u8865\u4E01\u987B\u81EA\u5E26\u8F7D\u8377\nlet hotChain = Promise.resolve();\nfunction iqToggleLive() {\n  setLive(!iqLive);\n  clog(iqLive ? '\u26A1 Live on: edits hot-apply on change (lost on reboot; Push to persist; tap again if 3A misbehaves)' : '\u26A1 Live off: edits collected, applied on Push');\n}\nfunction setLive(on) {\n  iqLive = on;\n  try { localStorage.setItem('rkIqLive', on ? '1' : '0'); } catch {}\n  const b = $('iqBtnLive');\n  if (b) b.classList.toggle('on', on);\n}\nfunction schedHot(key, patch) {\n  if (!iqLive) return;\n  const mod = iqModOf(patch.module);                // (\u4E0E server isHot \u540C\u5224)\n  if (mod !== 'sensor_calib' && !isHotMod(mod)) return;   // \u51B7\u6A21\u5757\u8D70 Push: \u5168\u51B7\u6279\u5230 server \u53EA\u4F1A\u62A5\u9519(\u514D\u7EA2\u5B57+\u514D\u5B88\u536B\u7A7A\u8DD1)\n  pendingHot.set(key, patch);                     // \u540C\u952E\u8986\u76D6: \u9632\u6296\u6279\u5185\u53EA\u7559\u7EC8\u503C(\u542B\u8FD8\u539F)\n  clearTimeout(hotT);\n  hotT = setTimeout(flushHot, 500);\n}\nfunction flushHot() {\n  if (!iqLive) { pendingHot.clear(); return; }   // \u5173 Live \u540E\u5728\u9014\u5B9A\u65F6\u5668\u4E0D\u518D\u5916\u53D1\n  const items = [...pendingHot.values()];         // \u8865\u4E01\u81EA\u5E26\u8F7D\u8377(\u8FD8\u539F\u64A4\u9500\u7684\u952E\u4E0D\u4F9D\u8D56 iqEdits)\n  pendingHot.clear();\n  if (!items.length) return;\n  hotChain = hotChain.then(async () => {\n    try {\n      const r = await post('/api/iq/apply', { patches: items });   // \u6210\u529F\u4E0D\u56DE\u663E: server \u5DF2\u9010\u9879 [apply] old\u2192new \u8FDB log\n      if (!r.ok) { clog(`\u26A1 hot-apply failed \u2014 ${r.error}`, 'err');\n             if (/tool_server|socket|UNIX/.test(r.error)) { setLive(false); clog('\u26A1 Live auto-disabled', 'warn'); } }\n    } catch (e) { clog(`\u26A1 hot-apply failed \u2014 ${e}`, 'err'); }\n  });\n}\nasync function iqSave() {\n  if (!iqEdits.size) { clog('iq: no edits'); return; }\n  const file = iqLoadedName.split('/').pop();\n  if (!confirm(`Write ${file} back to board?\\n\\n${iqEdits.size} edit(s), backup .bak-MMDD\\n\\n3A restarts automatically after write (~3s ISP preview interruption). Continue?`)) return;\n  try {\n    const r = await post('/api/iq/save', { patches: [...iqEdits.values()], restart: true });\n    if (r.ok) {\n      const tail = !r.restarted ? ' \u2014 restart 3A to take effect: systemctl restart rkaiq_3A'\n        : r.verified === false ? ` + 3A restarted but verify failed, params may not be active (${r.verifyError}; manual: systemctl restart rkaiq_3A)`\n        : ' + 3A restarted, new params active (verified: process newer than file write)';\n      clog(`iq: written ${file} (${r.bytes}B, backup ${r.backup})${tail}`, r.verified === false ? 'err' : 'ok');\n      loadIq();   // \u81EA\u52A8\u91CD\u62C9: \u63A7\u4EF6 orig \u95ED\u5305\u91CD\u7F6E\u4E3A\u5DF2\u5199\u76D8\u503C(\u4E0D\u6E05\u5219\u62D6\u56DE\u5DF2 Push \u503C\u4F1A\u88AB\u8BEF\u5224 dirty)\n    } else clog(`iq: write failed \u2014 ${r.error}`, 'err');\n  } catch (e) { clog(`iq: write failed \u2014 ${e}`, 'err'); }\n}\nlet iqProbeSeq = 0;                              // Pull \u5E76\u53D1\u9632\u62A4: \u540E\u53D1\u63A2\u6D4B\u7B97\u8D62, \u8FDF\u5230\u56DE\u5305\u4E22\u5F03\nasync function loadIq() {\n  if (!IQ_SCHEMA) IQ_SCHEMA = await IQ_SCHEMA_P;         // \u9996\u6B21\u6E32\u67D3\u524D\u7B49 schema(\u4E4B\u540E\u8D70\u7F13\u5B58; \u5931\u8D25=null \u8D70\u56DE\u843D)\n  const my = ++iqProbeSeq;\n  const body = $('iqBody'), file = $('iqFile');\n  body.innerHTML = '<div class=\"note\">probing\u2026</div>';\n  let r;\n  try { r = await (await fetch('/api/iq')).json(); }\n  catch (e) { if (my === iqProbeSeq) body.innerHTML = `<div class=\"note\">probe failed: ${e}</div>`; return; }\n  if (my !== iqProbeSeq) return;                 // \u5DF2\u6709\u66F4\u65B0\u7684 Pull, \u672C\u56DE\u5305\u4F5C\u5E9F\n  if (r.error) { body.innerHTML = `<div class=\"note\">${r.error}</div>`; return; }\n  IQSYNC.clear();                                // \u5168\u91CF\u91CD\u6E32\u67D3\u5728\u5373, \u65E7\u884C\u7684\u8DE8\u89C6\u56FE\u540C\u6B65\u5668\u5168\u90E8\u4F5C\u5E9F\n  file.textContent = (r.loaded || '').split('/').pop() || '(no record)';\n  iqLoadedName = r.loaded || '';\n  if (r.hotApplied) clog(`iq: ${r.hotApplied} hot-applied value(s) in view \u2014 engine state, not in file yet (Push to persist)`);\n  if (!r.raw) {                                   // \u672A\u52A0\u8F7D/xml/\u89E3\u6790\u5931\u8D25: \u53EA\u62A5\u6E05\u5355\n    iqEdits = new Map(); iqSaveBar();\n    $('aecbox').style.display = 'none';\n    body.innerHTML = `<div class=\"note\">${r.note || 'no data'} \xB7 ${r.files.length} files in /etc/iqfiles</div>`;\n    return;\n  }\n  body.innerHTML = '';                            // \u4E25\u683C\u7ED3\u6784\u955C\u50CF: \u9876\u5C42\u952E json \u539F\u5E8F, \u5185\u5BB9\u5168\u7531 DOM \u6784\u5EFA\u6302\u8F7D\n  iqEdits = new Map();                             // \u91CD\u63A2=\u4E22\u5F03\u672A\u4FDD\u5B58\u6539\u52A8, \u6743\u5A01\u503C\u91CD\u6765\n  pendingHot.clear(); clearTimeout(hotT);          // \u5728\u9014\u70ED\u5E94\u7528\u4E00\u5E76\u4F5C\u5E9F(\u9632\u4E22\u5F03\u7684\u7F16\u8F91\u665A\u5230\u53D1\u51FA)\n  const rw = r.raw;                                // = \u6574\u4E2A json\n  const renderMainScene = () => {                  // main_scene \u2192 #i \u573A\u666F \u2192 sub_scene #j \u2192 scene_ispXX \u2192 \u6A21\u5757\n    const gMS = iqGroup('main_scene', false, null, 'main_scene|');\n    rw.main_scene.forEach((sc, i) => {\n      const gI = iqGroup(`#${i} ${sc.name}`, false, null, `main_scene|${i}`);\n      iqLeaf('main_scene', 'name', sc.name, [i, 'name'], gI.body);\n      (sc.sub_scene || []).forEach((ss, j) => {\n        const gJ = iqGroup(`sub_scene #${j} ${ss.name}`, false, null, `main_scene|${i}/${j}`);\n        iqLeaf('main_scene', 'name', ss.name, [i, 'sub_scene', j, 'name'], gJ.body);\n        const ispKey = Object.keys(ss).find(x => /^scene_isp/.test(x));\n        if (!ispKey) return;\n        const gIsp = iqGroup(ispKey, false, null, `main_scene|${i}/${j}/${ispKey}`);\n        for (const m of Object.keys(ss[ispKey] || {})) {\n          const mod = `${sc.name}/${m}`;                    // \u6A21\u5757\u8EAB\u4EFD\u5E26\u573A\u666F\u524D\u7F00(roots/schema \u517C\u5BB9)\n          const g2 = iqGroup(m, false, () => iqTree(mod, ss[ispKey][m], [], g2.body), mod + '|', isHotMod(m));  // \u61D2+\u9ED8\u8BA4\u6536\u8D77, \u70ED\u6A21\u5757\u7EFF\u6807\n          gIsp.body.appendChild(g2.el);\n        }\n        gJ.body.appendChild(gIsp.el);\n        gI.body.appendChild(gJ.el);\n      });\n      gMS.body.appendChild(gI.el);\n    });\n    body.appendChild(gMS.el);\n  };\n  for (const k of Object.keys(rw)) {               // \u9876\u5C42: json \u952E\u5E8F\u539F\u4F4D\u6E32\u67D3(main_scene \u5230\u4F4D\u65F6\u539F\u4F4D\u8C03\u573A\u666F\u6811)\n    try {\n    if (/_len$/.test(k)) continue;                 // \u5E8F\u5217\u5316\u5197\u4F59\u957F\u5EA6, \u9690\u85CF\n    if (k === 'main_scene') { if (Array.isArray(rw[k])) renderMainScene(); continue; }\n    if (rw[k] && typeof rw[k] === 'object' && !Array.isArray(rw[k])) {\n      const g = iqGroup(k, false, null, '@' + k);    // \u9ED8\u8BA4\u5168\u90E8\u6536\u8D77(\u6301\u4E45\u6001\u8986\u76D6)\n      if (k === 'sensor_calib')\n        g.el.firstChild.title = 'Semi-hot: after patch only the AE calc side reloads (gain ceiling/conversion/latency); sensor driver not re-issued';\n      iqTree(k, rw[k], [], g.body);\n      body.appendChild(g.el);\n    } else if (Array.isArray(rw[k])) {\n      if (!rw[k].length) continue;                 // \u7A7A\u6570\u7EC4\u9690\u85CF\n      const n = document.createElement('div'); n.className = 'note';\n      n.textContent = `${k}[${rw[k].length}] (top-level array)`;\n      body.appendChild(n);\n    } else if (rw[k] !== null && typeof rw[k] !== 'object') {\n      iqLeaf(k, k, rw[k], [k], body);\n    }\n    } catch (e) { clog(`iq: top-level ${k} render failed \u2014 ${e.message} (continuing)`, 'err'); }\n  }\n  const ab = $('aecBody');                            // \u4E94\u6B65\u9762\u677F: Preview \u6846\u4E0B(\u4FA7\u680F), \u4E0E\u6811\u540C\u4E00\u6761 dirty/Push \u94FE\n  ab.innerHTML = '';\n  buildAecQuick(rw, ab);\n  ab.style.display = aecBoxOpen ? 'block' : 'none';   // \u6298\u53E0\u6001\u8DE8 pull \u4FDD\u6301\n  $('aecChev').textContent = aecBoxOpen ? '\u25BE' : '\u25B8';\n  $('aecbox').style.display = curSource === 'isp' ? 'block' : 'none';   // raw \u6E90\u4E0D\u663E(\u5207\u6E90\u5728\u9014\u56DE\u5305\u9632\u6F0F)\n  iqSaveBar();\n  clog(`iq: ${file.textContent} \u2713`);\n}\nfunction applyOrient() {          // \u955C\u50CF/\u7FFB\u8F6C\u7EAF\u663E\u793A\u5C42, \u504F\u597D\u5B58 localStorage\n  img.classList.toggle('mirror', $('cbMirror').checked);\n  img.classList.toggle('flip', $('cbFlip').checked);\n  try { localStorage.setItem('rkOrient',\n    JSON.stringify({ m: $('cbMirror').checked, f: $('cbFlip').checked })); } catch {}\n}\n(function restoreOrient() {\n  try {\n    const o = JSON.parse(localStorage.getItem('rkOrient') || '{}');\n    $('cbMirror').checked = !!o.m; $('cbFlip').checked = !!o.f; applyOrient();\n  } catch {}\n})();\n\n// ---- \u72B6\u6001\u8F6E\u8BE2: 1s \u5237\u65B0\u8FDE\u63A5\u6001/\u677F\u51B5/\u9762\u677F\u53EF\u89C1\u6027, \u6D41\u81EA\u65CB\u6CBF ----\nsetInterval(refresh, 1000);\nasync function refresh() {\n  // \u670D\u52A1\u4E0D\u53EF\u8FBE(\u91CD\u542F\u7A7A\u7A97/\u8FDB\u7A0B\u6B7B)\u89C6\u540C\u672A\u8FDE\u63A5: \u8D70\u65AD\u5F00\u6CBF\u590D\u4F4D\u4F1A\u8BDD\u6001\u2014\u2014\n  // \u5426\u5219\u65E7\u9875\u7684 dataset.modes \u6B8B\u7559 '1', \u65B0 server \u8FDE\u4E0A\u540E loadModes \u6C38\u4E0D\u518D\u53D1\n  let s; try { s = await (await fetch('/api/status')).json(); } catch { s = { connected: false }; }\n  const btn = $('btnConn'), di = $('devinfo'), fb = $('fmtbox'), ib = $('imgbox');\n  // native(\u8BBE\u5907\u539F\u751F\u8FD0\u884C): Connect/\u4E3B\u673A\u9762\u677F\u4E0D\u663E\u793A, \u53EA\u7559 badge; \u81EA\u8FDE\u5931\u8D25(\u4E14\u4E0D\u5728\u8FDE\u63A5\u4E2D)\u7ED9 \u21BB \u91CD\u8FDE\n  if (s.native) {\n    $('connRow').style.display = 'none';\n    $('nativeBadge').style.display = 'block';\n    $('btnRetry').style.display = !s.connected && !s.connecting ? 'block' : 'none';\n    $('manual').style.display = 'none';\n  } else {\n    $('connRow').style.display = '';                   // '' \u56DE\u843D\u6837\u5F0F\u8868 .row flex\n    $('nativeBadge').style.display = 'none';\n    $('btnRetry').style.display = 'none';\n  }\n  btn.classList.toggle('on', !!s.connected);\n  btn.textContent = s.connected ? 'Disconnect' : 'Connect';\n  ib.classList.toggle('off', !s.connected);            // \u65E0\u56FE: \u9ED1\u6846\u5360\u4F4D\n  if (s.connected && !streamOn) { streamOn = true; rc(); }   // \u8FDE\u63A5\u6CBF: \u7ACB\u5373\u8D77\u6D41\n  else if (!s.connected && streamOn) {                       // \u65AD\u5F00\u6CBF: \u505C\u81EA\u65CB+\u65AD\u65E7 MJPEG \u8FDE\u63A5\n    streamOn = false;\n    img.removeAttribute('src');          // \u5426\u5219\u670D\u52A1\u7AEF /stream interval \u6301\u7EED\u7A7A\u8F6C\u5230\u9875\u9762\u5173\u95ED\n  }\n  $('hostSel').disabled = !!s.connected;                  // \u5DF2\u8FDE\u63A5: \u76EE\u6807\u4E0D\u53EF\u6539\n  for (const id of ['mHost', 'mUser', 'mPass']) $(id).disabled = !!s.connected;\n  if (s.connected) {\n    fb.style.display = 'block';\n    $('fmtcur').textContent = s.fmtline || '--';\n    $('btnSnap').disabled = false;\n    curMode = s.mode || null;                        // \u5F53\u524D\u6863: \u5148\u8BB0\u4E0B\u4F9B loadModes \u586B\u5145\u540E\u56DE\u663E\n    curSource = s.source || 'raw';                   // modeChanged \u6309\u6E90\u5206\u53D1(isp=\u68AF\u5B50/raw=sensor \u6863)\n    curHost = s.host;                                // host \u5FEB\u7167\u952E(loadModes \u8FDF\u5230\u56DE\u5305\u5B88\u536B)\n    const msel = $('modeSel');\n    const want = curSource === 'isp' ? (s.ispopts || []) : modeOpts;   // \u4E0B\u62C9\u53CC\u8BED\u4E49: isp=\u8F93\u51FA\u5206\u8FA8\u7387\u68AF\u5B50\n    const have = [...msel.options].map(o => o.value);\n    if (want.length && have.join() !== want.join()) {   // \u5185\u5BB9\u53D8\u4E86\u624D\u91CD\u5EFA(\u6362\u6E90\u6CBF/\u9996\u586B)\n      msel.innerHTML = '';\n      for (const v of want) msel.appendChild(Object.assign(document.createElement('option'), { value: v, textContent: v }));\n    }\n    const curSel = curSource === 'isp' ? (s.ispsize || curMode) : curMode;\n    if (!modeBusy && curSel && msel.value !== curSel && [...msel.options].some(o => o.value === curSel))\n      msel.value = curSel;                           // \u6BCF\u62CD\u5E42\u7B49\u5BF9\u9F50(curl/\u591A\u6807\u7B7E\u9875\u5207\u6362\u4E5F\u540C\u6B65; \u5728\u9014\u4E0D\u56DE\u5F39)\n    msel.disabled = modeBusy || (curSource === 'isp' && !want.length);   // \u672A\u8FDE\u63A5\u6574\u4E2A\u6846\u9690\u85CF, \u8FD9\u91CC\u53EA\u7BA1\u5207\u6362\u9501\n    if (!srcBusy && s.source) {                      // \u6E90 radio \u5E42\u7B49\u5BF9\u9F50(\u591A\u6807\u7B7E\u9875/\u670D\u52A1\u7AEF\u56DE\u6EDA\u4E5F\u540C\u6B65; \u5207\u6362\u5728\u9014\u4E0D\u56DE\u5F39)\n      const rd = document.querySelector(`input[name=fmt][value=\"${s.source}\"]`);\n      if (rd && !rd.checked) rd.checked = true;\n    }\n    if (!fb.dataset.modes) { fb.dataset.modes = '1'; loadModes(); }   // \u6BCF\u4F1A\u8BDD\u679A\u4E3E\u4E00\u6B21\n    const iqb = $('iqcol');                       // IQ \u5217(\u5DE5\u5177\u884C+\u6846): \u4EC5 isp \u6E90\u663E\u793A(\u8C03\u53C2\u6548\u679C\u53EA ISP \u6210\u50CF\u53EF\u89C1), \u6BCF\u4F1A\u8BDD\u63A2\u4E00\u6B21\n    if (s.source === 'isp') {\n      iqb.style.display = 'flex';\n      if (!iqb.dataset.iq) { iqb.dataset.iq = '1'; loadIq(); }\n    } else { iqb.style.display = 'none'; $('aecbox').style.display = 'none'; }   // raw \u6E90\u540C\u85CF aecbox(\u9632\u5207\u6E90\u5728\u9014\u56DE\u5305\u6F0F\u663E)\n    di.style.display = 'block';\n    di.innerHTML = `<div class=\"t\">${s.hostname || '--'}</div>`\n      + `\u23F1 ${s.time || '--'}<br>CPU ${s.cpu || '--'}<br>RAM ${s.ram || '--'}<br>`\n      + `NET ${s.net || '--'}<br>FPS ${s.fps ? s.fps.toFixed(1) : '--'}`;\n  } else {                                    // \u672A\u8FDE\u63A5: \u9762\u677F\u5168\u9690\u85CF\n    fb.style.display = 'none';\n    $('fmtcur').textContent = '--';\n    $('btnSnap').disabled = true;\n    di.style.display = 'none';\n    if (fb.dataset.modes) {                    // \u65AD\u5F00\u6CBF: \u6E05\u65E7\u677F\u9009\u9879(\u4E0B\u4E2A\u8FDE\u63A5\u6CBF\u91CD\u62C9)\n      delete fb.dataset.modes; curMode = null; curHost = null;\n      $('modeSel').innerHTML = '';\n    }\n    const iqb = $('iqcol');                     // IQ \u5217\u540C\u6B65\u9690\u85CF+\u590D\u4F4D(\u4E0B\u4E2A\u8FDE\u63A5\u6CBF\u91CD\u63A2)\n    iqb.style.display = 'none'; delete iqb.dataset.iq;\n    $('aecbox').style.display = 'none'; $('aecBody').innerHTML = '';\n    $('iqFile').textContent = ''; $('iqBody').innerHTML = '<div class=\"note\">probing\u2026</div>';\n    iqEdits = new Map(); iqSaveBar();\n  }\n  const tb = $('tunebox');                    // sensor/focus \u76F4\u63A7\u9762\u677F: \u4EC5 raw \u6E90\u663E\u793A(ISP \u6E90=\u770B ISP \u6210\u50CF, \u76F4\u63A7\u5F52 raw \u5DE5\u4F5C\u53F0)\n  const sb = $('sensorbox'), fcb = $('focusbox');\n  const ctl = s.connected && s.source !== 'isp';\n  if (ctl) {\n    if (tb.style.display !== 'block') tb.style.display = 'block';\n    sb.style.display = 'block';               // \u6BCF\u62CD\u76F4\u5199(\u5E42\u7B49), \u65AD\u5F00\u590D\u4F4D\u5230\u52A0\u8F7D\u57FA\u7EBF\n    fcb.style.display = fcb.dataset.has ? 'block' : 'none';   // VCM \u6846(\u6709\u624D\u663E\u793A)\n    if (!sb.dataset.loaded) { sb.dataset.loaded = '1'; loadSensCtrls(); }  // \u6BCF\u4F1A\u8BDD\u679A\u4E3E\u4E00\u6B21\n  } else {\n    tb.style.display = 'none'; fcb.style.display = 'none'; sb.style.display = 'none';\n    delete sb.dataset.loaded;\n  }\n}\n\n// ---- log \u7A97: /api/log?since= \u589E\u91CF\u62C9\u53D6, 1s \u8F6E\u8BE2, \u8D34\u5E95\u81EA\u52A8\u6EDA ----\nlet logNext = 0;\nfunction clearLog() {                    // \u771F\u6E05: \u672C\u5730\u663E\u793A+\u670D\u52A1\u7AEF\u73AF(\u5237\u65B0\u4E0D\u56DE\u653E); logSeq \u5355\u8C03, \u589E\u91CF\u6D41\u4E0D\u53D7\u6270\n  $('logbox').innerHTML = '';\n  fetch('/api/log/clear', { method: 'POST' }).catch(() => {});\n}\nsetInterval(async () => {\n  let r; try { r = await (await fetch(`/api/log?since=${logNext}`)).json(); } catch { return; }\n  if (r.next !== undefined && r.next < logNext) {   // server \u91CD\u542F: logSeq \u5F52\u96F6\u2014\u2014\u672C\u5730\u65E7\u884C(\u53EF\u80FD\u6574\u5C4F\u65E7\u9519\u8BEF)\u4F5C\u5E9F\n    $('logbox').innerHTML = '';\n    logNext = 0;\n    return;                                         // \u4E0B\u62CD\u4ECE 0 \u91CD\u62C9\n  }\n  logNext = r.next || logNext;\n  if (!r.lines || !r.lines.length) return;\n  for (const l of r.lines) appendLog(`${l.t} ${l.s}`, l.lvl || 'info', false);\n}, 1000);\n\n// ---- \u521D\u59CB\u5316(\u6240\u6709\u51FD\u6570\u5B9A\u4E49\u540E): native \u5148\u63A2(\u514D\u9996\u62CD\u95EA\u4E3B\u673A\u9762\u677F) + \u4E3B\u673A\u4E0B\u62C9\u586B\u5145 + \u9996\u6B21\u72B6\u6001\u5237\u65B0 ----\n(async () => {\n  clog('UI 1024 (native: on-device mode, Connect panel hidden)');   // \u6784\u5EFA\u81EA\u8BC1: log \u7A97\u65E0\u6B64\u884C=\u6D4F\u89C8\u5668\u8FD8\u5728\u8DD1\u65E7\u7F13\u5B58\u9875\n  let native = false;\n  try { native = !!(await (await fetch('/api/status')).json()).native; } catch {}\n  setLive(iqLive);                                   // \u26A1 Live \u6301\u4E45\u5316\u6001\n  if (!native) {                                     // ssh \u6A21\u5F0F\u624D\u6709\u4E3B\u673A\u9762\u677F(native \u65E0 Connect \u53EF\u8A00)\n    let cached = [];\n    try { cached = JSON.parse(localStorage.getItem('rkHosts') || '[]'); } catch {}\n    fillHosts(Array.isArray(cached) ? cached : []);  // \u7F13\u5B58\u5373\u65F6\u586B(\u7A7A\u5219\u53EA\u5269 Manual \u9879)\n    refreshHosts();                                  // \u6E05\u5355\u77AC\u65F6, \u603B\u662F\u540C\u6B65\u4E00\u6B21\n    $('hostSel').addEventListener('focus', refreshHosts);   // \u5C55\u5F00\u4E0B\u62C9 \u2192 \u91CD\u8BFB\n  }\n  refresh();\n})();\n</script>\n</body>\n</html>\n" : null) || fs.readFileSync(path.join(__dirname, "public", "index.html"));
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Content-Length": Buffer.byteLength(page)
    });
    return res.end(page);
  }
  if (u.pathname === "/api/ssh-hosts") return json(res, sshHosts());
  if (u.pathname === "/api/log") {
    const since = parseInt(u.searchParams.get("since") || "0");
    const lines = LOG.filter((l) => l.id > since).slice(-100);
    return json(res, { next: lines.length ? lines[lines.length - 1].id : since, lines });
  }
  if (u.pathname === "/api/log/clear" && req.method === "POST") {
    LOG.length = 0;
    return json(res, { ok: true });
  }
  if (u.pathname === "/api/status") {
    return json(res, {
      ...session.hub.status(),
      ...session.state,
      host: session.host,
      connected: !!session.conn && !!session.fmt && !session.busy,
      // fmt=会话建成判据: 连接序列中途失败(conn 已就位但无流)不误报——native 模式 ↻ 重连按钮依赖此值
      connecting: session.busy,
      // 前端 ↻ 重连按钮防 boot 自连期闪烁
      native: NATIVE,
      // 设备原生运行模式(前端隐藏 Connect/主机面板)
      mode: session.modeSize,
      // 当前档(前端 modeSel 回显/对齐)
      ispsize: session.ispSize || session.modeSize,
      // ISP 输出分辨率(梯子当前值)
      ispopts: ispSizeOptions(),
      // ISP 输出分辨率梯子(1/8..1)
      source: session.source,
      // 预览源(前端 radio 回显/对齐)
      fmtline: fmtLine()
    });
  }
  if (u.pathname === "/api/connect" && req.method === "POST") {
    try {
      const r = await sessionConnect(await readJson(req));
      slog(`[session] connected ${r.host} \u2192 ${r.fmt}`, "ok");
      return json(res, { ok: true, ...r });
    } catch (e) {
      slog(`[session] connect failed: ${e.message}`, "err");
      return json(res, { ok: false, error: e.message }, e.httpCode || 502);
    }
  }
  if (u.pathname === "/api/disconnect" && req.method === "POST") {
    sessionDisconnect();
    slog("[session] disconnected");
    return json(res, { ok: true });
  }
  if (u.pathname === "/api/modes") {
    if (!session.conn || session.busy)
      return json(res, { error: session.busy ? "connecting" : "not connected" }, 503);
    await ensureModes();
    return json(res, { sensor: session.sensorEntity, modes: session.modes });
  }
  if (u.pathname === "/api/mode" && req.method === "POST") return apiMode(req, res);
  if (u.pathname === "/api/source" && req.method === "POST") return apiSource(req, res);
  if (u.pathname === "/api/ispsize" && req.method === "POST") return apiIspSize(req, res);
  if (u.pathname === "/api/subdev-ctrls") {
    if (!session.conn) return json(res, { error: "not connected" }, 503);
    const out = { ctrls: await enumSubdevCtrls(session.conn, session.subdev), subdev: session.subdev };
    if (session.vcmNode)
      out.vcm = {
        node: session.vcmNode,
        ctrls: await enumSubdevCtrls(session.conn, session.vcmNode).catch(() => [])
      };
    return json(res, out);
  }
  if (u.pathname === "/api/subdev-set" && req.method === "POST") return apiSubdevSet(req, res);
  if (u.pathname === "/api/iq-schema") return json(res, IQ_SCHEMA || {});
  if (u.pathname === "/api/iq") {
    if (!session.conn) return json(res, { error: "not connected" }, 503);
    const r = await probeIq(session.conn);
    session.iqJson = r.full || null;
    session.iqLoaded = session.iqJson ? r.loaded : null;
    session.iqRoots = session.iqJson ? r.roots : null;
    let hotN = 0;
    if (session.iqJson && session.iqHot.size)
      for (const [k, it] of session.iqHot) {
        const node = nodeAt(session.iqJson, session.iqRoots, it.module, it.rel);
        const leaf = it.rel[it.rel.length - 1];
        if (!node || !(leaf in node) || JSON.stringify(node[leaf]) === JSON.stringify(it.value)) {
          session.iqHot.delete(k);
          continue;
        }
        node[leaf] = it.value;
        hotN++;
      }
    r.hotApplied = hotN;
    delete r.full;
    delete r.roots;
    return json(res, r);
  }
  if (u.pathname === "/api/iq/apply" && req.method === "POST") {
    if (!session.conn) return json(res, { error: "not connected" }, 503);
    if (session.iqBusy) return json(res, { error: "IQ file operation in progress" }, 409);
    if (!session.iqJson) return json(res, { error: "no IQ probed (pull first)" }, 409);
    session.iqBusy = true;
    try {
      const HOT = IQ_SCHEMA && IQ_SCHEMA._meta && IQ_SCHEMA._meta.hot_prefixes || [];
      const isHot = (m) => m === "sensor_calib" || HOT.some((p) => m.startsWith(p));
      const ts = (await execOnce(
        session.conn,
        "pgrep -f '[r]kaiq_tool_server' 2>/dev/null | head -1",
        8e3
      )).trim();
      if (ts) throw Error("tool_server is running and holds the single-client unix socket \u2014 stop it first");
      const sock = (await execOnce(
        session.conn,
        "ls -1 /tmp/UNIX.domain* 2>/dev/null | head -1",
        8e3
      )).trim();
      if (!sock) throw Error("no /tmp/UNIX.domain* (3A server not running?)");
      const { patches } = await readJson(req);
      const items = [], skipped = [];
      for (const p of patches || []) {
        const mod = p.module.split("/").pop();
        if (!isHot(mod)) {
          skipped.push(p.module + "/" + p.path.join("/"));
          continue;
        }
        items.push({
          op: "replace",
          path: "/" + mod + "/" + p.path.join("/"),
          value: p.value,
          module: p.module,
          rel: p.path
        });
      }
      if (!items.length) throw Error("no hot-module patches (all skipped)");
      const payload = JSON.stringify(items.map(({ op, path: path2, value }) => ({ op, path: path2, value })));
      const pl = Buffer.from(payload, "utf8");
      const head = Buffer.alloc(24);
      head.writeUInt8(82, 0);
      head.writeUInt8(170, 1);
      head.writeUInt8(255, 2);
      head.writeUInt8(75, 3);
      head.writeInt32LE(0, 4);
      head.writeInt32LE(0, 8);
      head.writeUInt32LE(++session.iqPktSeq, 12);
      head.writeUInt32LE(pl.length, 16);
      head.writeUInt32LE(pl.length, 20);
      await new Promise((rs, rj) => session.conn.openssh_forwardOutStreamLocal(sock, (err, stream) => {
        if (err) return rj(Error("socket connect: " + err.message));
        stream.on("error", (e) => rj(Error("socket: " + e.message)));
        stream.write(Buffer.concat([head, pl, Buffer.alloc(4)]), () => setTimeout(() => {
          try {
            stream.end();
          } catch {
          }
          rs();
        }, 400));
      }));
      const fmt = (v) => {
        const s = JSON.stringify(v);
        return s.length > 56 ? s.slice(0, 36) + "\u2026" + s.slice(-6) : s;
      };
      let n = 0;
      for (const it of items) {
        const node = nodeAt(session.iqJson, session.iqRoots, it.module, it.rel);
        const leaf = it.rel[it.rel.length - 1];
        if (JSON.stringify(node[leaf]) === JSON.stringify(it.value)) continue;
        slog(`[apply] ${it.module}/${it.rel.join("/")}: ${fmt(node[leaf])} \u2192 ${fmt(it.value)}`, "ok");
        session.iqHot.set(it.module + "|" + it.rel.join("/"), it);
        n++;
      }
      if (skipped.length) slog(`[apply] skipped ${skipped.length} non-hot item(s) (use Push for those): ${skipped.slice(0, 3).join(" ")}${skipped.length > 3 ? "\u2026" : ""}`, "warn");
      return json(res, { ok: true, applied: n, skipped: skipped.length });
    } catch (e) {
      slog(`[iq] apply failed: ${e.message}`, "err");
      return json(res, { ok: false, error: e.message }, 400);
    } finally {
      session.iqBusy = false;
    }
  }
  if (u.pathname === "/api/iq/save" && req.method === "POST") {
    if (!session.conn) return json(res, { error: "not connected" }, 503);
    if (session.iqBusy) return json(res, { error: "IQ file operation in progress" }, 409);
    if (!session.iqJson) return json(res, { error: "no IQ probed (pull first)" }, 409);
    session.iqBusy = true;
    try {
      const body = await readJson(req);
      applyPatches(session.iqJson, session.iqRoots, body.patches || []);
      const text = JSON.stringify(session.iqJson, null, 1);
      if (text.length < 1024) throw Error("serialized json suspiciously small, abort");
      const d = /* @__PURE__ */ new Date();
      const bak = session.iqLoaded + `.bak-${d.getMonth() + 1}${String(d.getDate()).padStart(2, "0")}`;
      await execOnce(session.conn, `[ -f ${bak} ] || cp ${session.iqLoaded} ${bak}`, 1e4);
      await sftpWrite(session.conn, session.iqLoaded, text);
      try {
        await execOnce(
          session.conn,
          // (手工备份如 .bak-1014b 不匹配模式, 永不动); 失败不影响已成功的写回
          `ls -1 ${session.iqLoaded}.bak-* 2>/dev/null | grep -E "\\.bak-[0-9]{3,4}(-[0-9]+)?$" | sort -r | tail -n +4 | xargs -r rm -f`,
          1e4
        );
      } catch (e) {
        slog(`[iq] backup prune failed (non-fatal): ${e.message}`, "warn");
      }
      let restarted = false, verify = null;
      if (body.restart) {
        const restart3A = () => execOnce(
          session.conn,
          "systemctl restart rkaiq_3A 2>/dev/null || { killall rkaiq_3A_server 2>/dev/null; sleep 1; /etc/init.d/S40rkaiq_3A start; }",
          2e4
        );
        if (session.source === "isp" && session.src)
          await rekeyStream(600, async () => {
            await restart3A();
            await sleep(1500);
          });
        else {
          await restart3A();
          await sleep(500);
        }
        restarted = true;
        verify = await verify3ARestart(session.conn, session.iqLoaded);
        slog(
          verify.ok ? `[iq] 3A restart verified \u2014 pid started ${verify.after}s after write` + (verify.journalHit === null ? "" : verify.journalHit ? `, journal confirms ${session.iqLoaded.split("/").pop()}` : ", journal shows DIFFERENT iq file!") : `[iq] 3A restart verify FAILED: ${verify.error} \u2014 manual: systemctl restart rkaiq_3A`,
          verify.ok ? "ok" : "err"
        );
      }
      slog(
        `[iq] wrote ${session.iqLoaded} (${text.length}B, ${(body.patches || []).length} patches, backup ${bak.split("/").pop()}${restarted ? `, 3A restarted${verify.ok ? " (verified)" : " (VERIFY FAILED)"}` : " \u2014 restart 3A to apply: systemctl restart rkaiq_3A"})`,
        verify && !verify.ok ? "err" : "ok"
      );
      return json(res, {
        ok: true,
        bytes: text.length,
        backup: bak.split("/").pop(),
        restarted,
        verified: verify ? verify.ok : void 0,
        verifyError: verify && !verify.ok ? verify.error : void 0
      });
    } catch (e) {
      slog(`[iq] save failed: ${e.message}`, "err");
      return json(res, { ok: false, error: e.message }, 400);
    } finally {
      session.iqBusy = false;
    }
  }
  if (u.pathname === "/api/iq/restore" && req.method === "POST") {
    if (!session.conn) return json(res, { error: "not connected" }, 503);
    if (session.iqBusy) return json(res, { error: "IQ file operation in progress" }, 409);
    if (!session.iqLoaded) return json(res, { error: "no IQ probed (pull first)" }, 409);
    session.iqBusy = true;
    try {
      const bak = (await execOnce(
        session.conn,
        `ls -1 ${session.iqLoaded}.bak-* 2>/dev/null | sort | tail -1`,
        1e4
      )).trim();
      if (!bak)
        return json(res, { ok: false, error: `no backup for ${session.iqLoaded.split("/").pop()}` }, 404);
      await execOnce(session.conn, `cp ${bak} ${session.iqLoaded}`, 1e4);
      slog(`[iq] restored ${session.iqLoaded.split("/").pop()} \u2190 ${bak.split("/").pop()} \u2014 restart 3A to apply: systemctl restart rkaiq_3A`, "ok");
      session.iqJson = null;
      session.iqRoots = null;
      session.iqLoaded = null;
      session.iqHot.clear();
      return json(res, { ok: true, restored: bak.split("/").pop() });
    } finally {
      session.iqBusy = false;
    }
  }
  if (u.pathname === "/api/snapshot") {
    const j = session.hub.jpeg;
    if (!j) {
      slog("[snapshot] no frame yet", "warn");
      return json(res, { error: "no frame yet" }, 503);
    }
    const name = `/tmp/rkcam_${(/* @__PURE__ */ new Date()).toTimeString().slice(0, 8).replace(/:/g, "")}.jpg`;
    fs.writeFileSync(name, j);
    slog(`[snapshot] saved ${name} (${session.decW}x${session.decH})`, "ok");
    return json(res, { saved: name });
  }
  if (u.pathname === "/stream") {
    if (!session.conn) return json(res, { error: "not connected" }, 503);
    res.writeHead(200, {
      "Content-Type": "multipart/x-mixed-replace; boundary=frame",
      "Connection": "close"
    });
    let last = null;
    const iv = setInterval(() => {
      const j = session.hub.jpeg;
      if (j && j !== last) {
        last = j;
        res.write(`--frame\r
Content-Type: image/jpeg\r
Content-Length: ${j.length}\r
\r
`);
        res.write(j);
        res.write("\r\n");
      }
    }, 30);
    req.on("close", () => clearInterval(iv));
    res.on("error", () => clearInterval(iv));
    return;
  }
  res.writeHead(404);
  res.end("not found");
}
async function rekeyStream(waitMs, mid) {
  if (session.src) {
    session.src.stop();
    session.src = null;
  }
  session.hub = new Hub();
  await sleep(waitMs);
  if (mid) await mid();
  await setupStreamFmt(session.conn);
  startStream();
}
async function recoverStream(tag) {
  try {
    await setupStreamFmt(session.conn);
    startStream();
  } catch (e) {
    slog(`${tag} stream restore failed: ${e.message}`, "err");
  }
}
async function verify3ARestart(conn, iqFile) {
  let last = "no response";
  for (let i = 0; i < 2; i++) {
    let out = "";
    try {
      out = await execOnce(
        conn,
        `F=$(stat -c %Y ${iqFile} 2>/dev/null); P=$(pgrep -n rkaiq_3A_server) && echo $F $(date +%s) $(awk '{print int($1)}' /proc/uptime) $(awk '{print $22}' /proc/$P/stat) $(getconf CLK_TCK 2>/dev/null || echo 100); journalctl -u rkaiq_3A --no-pager --since '-60 sec' 2>/dev/null | grep -o 'iq:[^ ]*'`,
        1e4
      );
    } catch (e) {
      last = e.message;
    }
    const lines = out.trim().split("\n").filter(Boolean);
    const m = (lines[0] || "").match(/^(\d+) (\d+) (\d+) (\d+) (\d+)$/);
    if (!m) {
      await sleep(1e3);
      continue;
    }
    const [fMtime, now, upSec, startTicks, clk] = m.slice(1).map(Number);
    const after = Math.round(now - upSec + startTicks / clk - fMtime);
    if (after < 0)
      return { ok: false, error: `3A process started ${-after}s before file write \u2014 new IQ not live` };
    const iqLines = lines.slice(1).map((s) => s.replace(/^iq:/, "").replace(/\/\//g, "/"));
    return { ok: true, after, journalHit: iqLines.length ? iqLines.includes(iqFile) : null };
  }
  return { ok: false, error: `rkaiq_3A_server not running after restart (${last})` };
}
async function apiMode(req, res) {
  if (!session.conn || !session.sensorEntity || session.busy)
    return json(res, { error: session.busy ? "connecting" : "not connected" }, 503);
  const req2 = await readJson(req);
  await ensureModes();
  const m = session.modes.find((x) => x.size === req2.size);
  if (!m) return json(res, { error: `unknown mode ${req2.size}` }, 400);
  if (m.size === session.modeSize) return json(res, { ok: true, note: "already current mode" });
  if (session.source === "isp")
    return json(res, { error: "mode switch requires Sensor source (ISP preview locks to boot-mode resolution; switch Sensor to change mode, ISP recovers when switched back to boot mode)" }, 409);
  const prev = session.modeSize;
  let applied = false;
  try {
    await rekeyStream(1200, async () => {
      await sensorSetMode(session.conn, m.size);
      applied = true;
      session.modeSize = m.size;
      await vblankDefault(session.conn);
    });
    slog(`[mode] sensor \u2192 ${m.size}, stream re-keyed in place`);
    return json(res, { ok: true, mode: m.size, fmtline: fmtLine() });
  } catch (e) {
    slog(`[mode] switch to ${m.size} failed: ${e.message}, rolling back to ${prev}`, "err");
    session.modeSize = prev;
    if (applied && session.conn)
      await sensorSetMode(session.conn, prev).then(() => vblankDefault(session.conn)).catch((e2) => slog(`[mode] rollback to ${prev}: ${e2.message}`, "err"));
    await recoverStream("[mode]");
    return json(res, { ok: false, error: e.message }, 502);
  }
}
async function apiSource(req, res) {
  if (!session.conn || session.busy)
    return json(res, { error: session.busy ? "connecting" : "not connected" }, 503);
  const req2 = await readJson(req);
  const s = req2.source;
  if (s !== "raw" && s !== "isp") return json(res, { error: `unknown source ${s}` }, 400);
  if (s === session.source) return json(res, { ok: true, note: `already ${s}` });
  const prev = session.source;
  session.source = s;
  try {
    await rekeyStream(600, s === "isp" ? async () => {
      await ensureIspBase(session.conn);
      const opts = ispSizeOptions();
      if (!opts.includes(session.ispSize)) session.ispSize = opts[0] || null;
    } : async () => {
      try {
        if (!session.modes.length) await ensureModes();
      } catch {
      }
      const small = session.modes[0];
      if (small && session.sensorEntity && session.modeSize !== small.size) {
        await sensorSetMode(session.conn, small.size);
        session.modeSize = small.size;
        await vblankDefault(session.conn);
        slog(`[source] sensor \u2192 ${small.size} (smallest mode, raw default)`, "warn");
      }
    });
    saveSource();
    slog(`[source] preview \u2192 ${s} (${session.fmt.dev} \xB7 ${session.fmt.id} ${session.fmt.w}x${session.fmt.h})`, "ok");
    return json(res, { ok: true, source: s, fmtline: fmtLine() });
  } catch (e) {
    slog(`[source] switch to ${s} failed: ${e.message}, rolling back to ${prev}`, "err");
    session.source = prev;
    await recoverStream("[source]");
    return json(res, { ok: false, error: e.message }, 502);
  }
}
async function apiIspSize(req, res) {
  if (!session.conn || session.busy)
    return json(res, { error: session.busy ? "connecting" : "not connected" }, 503);
  if (session.source !== "isp")
    return json(res, { error: "isp size applies to ISP source (radio) only" }, 409);
  const req2 = await readJson(req);
  const opts = ispSizeOptions();
  if (!opts.includes(req2.size))
    return json(res, { error: `size must be one of: ${opts.join(", ")}` }, 400);
  if (req2.size === session.ispSize)
    return json(res, { ok: true, note: "already current size" });
  const prev = session.ispSize;
  session.ispSize = req2.size;
  try {
    await rekeyStream(600);
    saveSource();
    slog(`[ispsize] ISP output \u2192 ${session.fmt.w}x${session.fmt.h}`, "ok");
    return json(res, { ok: true, size: `${session.fmt.w}x${session.fmt.h}`, fmtline: fmtLine() });
  } catch (e) {
    slog(`[ispsize] switch to ${req2.size} failed: ${e.message}, rolling back`, "err");
    session.ispSize = prev;
    await recoverStream("[ispsize]");
    return json(res, { ok: false, error: e.message }, 502);
  }
}
async function apiSubdevSet(req, res) {
  if (!session.conn) return json(res, { error: "not connected" }, 503);
  const req2 = await readJson(req);
  const { name, value } = req2;
  const dev = req2.vcm ? session.vcmNode : session.subdev;
  if (req2.vcm && !dev) return json(res, { error: "no VCM node (not found in media graph)" }, 400);
  const ctrls = await enumSubdevCtrls(session.conn, dev);
  const c = ctrls.find((x) => x.name === name);
  if (!c) return json(res, { error: `unknown control ${name}` }, 400);
  if (c.ro) return json(res, { error: `${name} is read-only` }, 400);
  const v = parseInt(value, 10);
  if (!(v >= c.min && v <= c.max)) return json(res, { error: `${name} out of range ${c.min}..${c.max}` }, 400);
  const writeOnce = () => execOnce(
    session.conn,
    `v4l2-ctl -d ${dev} -c ${name}=${v} 2>/dev/null`,
    15e3
  );
  const readOnce = () => execOnce(
    session.conn,
    `v4l2-ctl -d ${dev} --get-ctrl=${name} 2>/dev/null`,
    1e4
  );
  const clean = (s) => s.split("\n").map((x) => x.trim()).filter((x) => x && !/^VIDIOC_/.test(x)).join(" ");
  const gotOf = (s) => (s.match(/:\s*(-?\d+)/) || [])[1];
  await writeOnce();
  let cur = await readOnce();
  let got = gotOf(cur);
  if ((got === void 0 || +got !== v) && c.grabbed && session.src && !session.src.paused) {
    slog(`[subdev] ${name}=${v} rejected (grabbed), retrying in stream-pause window`, "warn");
    session.src.pause();
    await sleep(1600);
    try {
      await writeOnce();
      cur = await readOnce();
      got = gotOf(cur);
    } finally {
      session.src.resume();
    }
  }
  const out = { ok: got !== void 0 && +got === v, current: clean(cur) || "readback failed" };
  if (out.ok) slog(`[subdev] ${name}=${v} \u2713`, "ok");
  else slog(`[subdev] ${name}=${v} not applied, readback: ${out.current}`, "err");
  if (name === "vertical_blanking")
    out.ctrls = await enumSubdevCtrls(session.conn, session.subdev).catch(() => null);
  return json(res, out);
}
var srv = http.createServer((req, res) => {
  res.on("error", () => {
  });
  route(req, res).catch((e) => {
    slog(`[http] ${e.message}`, "err");
    if (!res.headersSent) json(res, { ok: false, error: e.message }, e.httpCode || 502);
  });
});
var port = parseInt(arg("--port", "8092"));
srv.listen(port, "0.0.0.0", async () => {
  const how = process.argv.includes("--native") ? "--native forced" : process.argv.includes("--ssh") ? "--ssh forced (on-device but ssh panel)" : NATIVE ? "on-device detected (rockchip device-tree)" : "ssh (host)";
  slog(`[boot] mode: ${NATIVE ? "native (running on device)" : "ssh"} \u2014 ${how}`);
  console.log(`
  ==> JS console (raw/ISP preview + sensor direct control): http://localhost:${port}${NATIVE ? " \u2014 native mode (on device), auto-connecting" : " \u2014 pick a board in the left panel"}
`);
  if (NATIVE)
    sessionConnect({ native: true }).then((r) => slog(`[session] auto-connected (native) \u2192 ${r.fmt}`, "ok")).catch((e) => slog(`[session] native auto-connect failed: ${e.message} \u2014 retry via \u21BB in page`, "err"));
});
